import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/user';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notifications';
import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      throw new Error('You can only create appointments with providers');
    }

    if (isProvider.id === user_id) {
      throw new Error('You cannot create appointments with yourself');
    }

    const hourStart = startOfHour(parseISO(date)); // transforma a data em formato JS e pega somente horario Oclock 19,18..

    if (isBefore(hourStart, new Date())) {
      // se a data for antes do dia atual ele n permite marcar
      throw new Error('Past dates are not permitted');
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
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      user_id,
      date: hourStart, // transforma horario oClock
      provider_id,
    });

    /**
     * Notifica o prestador de servico
     */

    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    ); // dia 22 de junho, as 18:30h, em portugues

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    await Cache.invalidatePrefix(`user:${user_id}:appointments`);
    return appointment;
  }
}
export default new CreateAppointmentService();
