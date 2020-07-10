import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String, // conteudo da notificacao
      required: true,
    },
    user: {
      type: Number, // usuario que recebeu
      required: true,
    },
    read: {
      type: Boolean, // se ele leu ou nao
      required: true,
      default: false,
    },
  },
  { timestamps: true } // horario que gravou
);

export default mongoose.model('notification', NotificationSchema);
