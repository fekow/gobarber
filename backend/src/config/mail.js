export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Gobarber <norepy@gobarber.com>',
  },
};
// peguei isso da conta do mailtrap, mas tenho que usar outros pra deploy
