import { isBefore, subHours } from 'date-fns';

import User from '../models/user';
import Appointment from '../models/Appointment';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import Cache from '../../lib/Cache';

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
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

    if (appointment.user_id !== user_id) {
      throw new Error("You don't have permission to cancel this appointment");
    }
    // regra de cancelar ate 2 horas antes
    const dateWithSub = subHours(appointment.date, 2); // pega o horario da marcacao e reduz duas horas pra comparar
    // 13:00
    // dateWithSub: 11:00
    // now: 11:25h, ou seja so poderia ter desmarcado ate as 11h

    if (isBefore(dateWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance.');
    }

    appointment.canceled_at = new Date(); // defino a data dessa coluna ja q foi cancelado

    await appointment.save(); // salvo isso

    // adiciono pra fila esse envio de email
    await Queue.add(CancellationMail.key, {
      appointment, // mando essa info pro cancellation mail handle
    });
    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
