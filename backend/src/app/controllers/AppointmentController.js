import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt'; // pega datas em portugues
import Appointment from '../models/Appointment';
import User from '../models/user';
import File from '../models/file';
import Notification from '../schemas/Notifications';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res, next) {
    const { page = 1 } = req.query; // se nao tiver definido o padrao é 1
    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null }, // nao pego os que ja foram cancelados
      order: ['date'], // ordeno por data
      attributes: ['id', 'date', 'past', 'cancellable'], // pego so oque me interessa
      limit: 20, // somente aparece 20 em cada request
      offset: (page - 1) * 20, // usa a página pra fazer um calculo que pula registros na db encontrados de acordo com a pagina requerida
      include: [
        {
          model: User, // puxo do model do user as info do provider
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File, // puxo do puxado o file, onde tem o avatar do provider
              as: 'avatar',
              attributes: ['id', 'path', 'url'], // tenho que passar o path pra logica do url.virtual funcionar
            },
          ],
        },
      ],
    });

    return res.json(appointment);
  }

  async store(req, res, next) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const { provider_id, date } = req.body;

    // checa se o provider_id é de um provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }
    if (isProvider.id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You cannot create appointments with yourself' });
    }

    const hourStart = startOfHour(parseISO(date)); // transforma a data em formato JS e pega somente horario Oclock 19,18..

    if (isBefore(hourStart, new Date())) {
      // se a data for antes do dia atual ele n permite marcar
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // checa disponibilidade de data do provider

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null, // nao olha aquelas que foram canceladas
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      date: hourStart, // transforma horario oClock
      provider_id,
    });

    /**
     * Notifica o prestador de servico
     */

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    ); // dia 22 de junho, as 18:30h, em portugues

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res, next) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }
    // regra de cancelar ate 2 horas antes
    const dateWithSub = subHours(appointment.date, 2); // pega o horario da marcacao e reduz duas horas pra comparar
    // 13:00
    // dateWithSub: 11:00
    // now: 11:25h, ou seja so poderia ter desmarcado ate as 11h

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    appointment.canceled_at = new Date(); // defino a data dessa coluna ja q foi cancelado

    await appointment.save(); // salvo isso

    // adiciono pra fila esse envio de email
    await Queue.add(CancellationMail.key, {
      appointment, // mando essa info pro cancellation mail handle
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
