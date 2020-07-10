import Notification from '../schemas/Notifications';
import User from '../models/user';

class NotificationController {
  async index(req, res, next) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkIsProvider) {
      return res
        .status(400)
        .json({ error: 'Only providers can load notifications' });
    }
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({
        createdAt: 'desc', // poe a mais recente em cima
      })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res, next) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // faz com que esse metodo retorne um valor pra poder listar
    );

    res.json({ notification });
  }
}

export default new NotificationController();
