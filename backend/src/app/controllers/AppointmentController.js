import Appointment from '../models/Appointment';
import User from '../models/user';
import File from '../models/file';

import Cache from '../../lib/Cache';

import CreateAppointmentService from '../services/CreateAppointmentService';
import CancelAppointmentService from '../services/CancelAppointmentService';

class AppointmentController {
  async index(req, res, next) {
    const { page = 1 } = req.query; // se nao tiver definido o padrao é 1

    const cacheKey = `user:${req.userId}:appointments:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

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
    await Cache.set(cacheKey, appointment);
    return res.json(appointment);
  }

  async store(req, res, next) {
    const { provider_id, date } = req.body;

    const appointment = await CreateAppointmentService.run({
      provider_id,
      user_id: req.userId,
      date,
    });

    return res.json(appointment);
  }

  async delete(req, res, next) {
    const appointment = await CancelAppointmentService.run({
      provider_id: req.params.id,
      user_id: req.userId,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
