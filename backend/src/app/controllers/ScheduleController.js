import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/user';

class ScheduleController {
  async index(req, res, next) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)], // pega somente itens do dia que vem do query
        },
      },
      order: ['date'], // ordeno por data
      attributes: ['id', 'date', 'user_id'], // pego so oque me interessa
      limit: 20, // somente aparece 20 em cada request
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
