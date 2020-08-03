import User from '../models/user';
import File from '../models/file';
import Cache from '../../lib/Cache';

class ProviderControler {
  async index(req, res, next) {
    const cached = await Cache.get('providers');
    if (cached) {
      return res.json(cached);
    }
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
    await Cache.set('providers', providers);

    return res.json(providers);
  }
}

export default new ProviderControler();
