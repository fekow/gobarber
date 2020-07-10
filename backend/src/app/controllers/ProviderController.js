import User from '../models/user';
import File from '../models/file';

class ProviderControler {
  async index(req, res, next) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        // puxa a conexao com o outro pra pegar info relacionado ao id do avatar
        {
          model: File,
          as: 'avatar', // tem que passar o as aqui tambem.......
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(providers);
  }
}

export default new ProviderControler();
