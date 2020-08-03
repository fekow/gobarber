import User from '../models/user';
import File from '../models/file';

import Cache from '../../lib/Cache';

class UserController {
  // registra um usuario no banco de dados
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // pego somente os dados que me importam no frontend ao mesmo tempo que crio o user na db, mandando todo o model
    const { id, name, email, provider } = await User.create(req.body);
    if (provider) {
      await Cache.invalidate('providers');
    }
    // como já esta definido no model os capos que pode receber, ele aloca automaticamente, pode botar req.body inteiro

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // funcao atualiza dado de usuario, so vem aqui se foi autenticado antes no middleware
  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId); // peguei userId la no middleware, pk=primary key
    // se tu quer trocar email
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } }); // ve se existe outro email igual
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    // somente verifico senha se ele inseriu uma nova.
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    await user.update(req.body); // ja passo tudo que quero mudar

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
