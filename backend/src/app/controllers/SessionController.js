import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/user';
import File from '../models/file';

class SessionController {
  async store(req, res) {
    // pego de dentro so oq presiso pra autenticar
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    }); // nao precisa setar x:x ja q sao o mesmo nome na tabela
    // verficicacoes de user e user+password
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    // utiliza o metodo checkpassword do user, herdado da classe User do model, pra checar usando bcrypt
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // pega os dados validos da pesquisa na db  e utiliza pra criar o token

    const { id, name, avatar, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      }, // o .sign cria o token, mando id como payload
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, // dura 7dias
      }),
    }); // token vai como segundo parametro no json, usando o id e as configs dele
  }
}
// barbeariacabelobigodenode - é o md5 da senha do tokem, depois mudar para .env
export default new SessionController();
