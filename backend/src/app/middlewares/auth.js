import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // usa o async await ao inves de um callback f

import authConfig from '../../config/auth';
// posso passar uma funcao normal como middleware, pegando as propriedades do request e passando adiante
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // apenas ve esta carregando um token pra nao checar na db se estiver vazio

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // pego somente o token e desconsidero bearer
  // usa o try ao inves do callback do jwt que é velho
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // verifica se o token é valido, usando o segredo pra decodificar

    req.userId = decoded.id; // mando o userId pra quando for renomear

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
