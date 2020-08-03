import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns'; // trabalha com date ou Number
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableService {
  async run({ provider_id, date }) {
    const appointment = await Appointment.findAll({
      where: {
        provider_id,
        canceled_at: null,
        date: {
          // Op é o betwen do sequelize
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(date, hour), minute), // Cria value do dia baseado nos horarios do profissional
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"), // formata no moto utf bizarro
        available:
          isAfter(value, new Date()) && // so estao disponiveis horarios depois do hotario atual
          !appointment.find(a => format(a.date, 'HH:mm') === time), // .find dentro dos appointments do dia,
        // formato data e vejo se ele esta marcado pra um horario estabelecido, logica de marcação.
      };
    });
    return available;
  }
}

export default new AvailableService();
