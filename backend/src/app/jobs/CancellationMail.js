import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // pego informacao que recebi e desistruturo
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name}<${appointment.provider.email}>`, // primeiro vai o nome depois o email dentro de <>
      subject: 'Agendamento cancelado',
      template: 'cancellation', // nome do template q vou usar
      context: {
        // variavies que vou enviar pro meu template
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
// get key permite que seja usado como variavel se chamar CancellationMail.key,
// ele ja passa essa chave unica, que é necessaria pros jobs.
