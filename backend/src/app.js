import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors'; // pega erro das funcoes async, fica antes das rotas

import routes from './routes';
import sentryConfig from './config/sentry'; // debugger afude que pega issue no site deles

import './database'; // trazendo isso pra cá ja ativa tudo que ta escrito lá, nem precisa delimitar o index

// this é basicamente app.
class App {
  constructor() {
    this.server = express(); // a classe App ganha funcoes do express

    Sentry.init(sentryConfig); // inicio com as config que peguei do site

    this.middlewares(); // inicializo essas funções
    this.routes();
    this.exceptionHandler(); // impesso do request ficar rodando por horas
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler()); // insiro antes de todos middleware
    this.server.use(cors()); // aqui passaria o endereço que pode acessar o server{origin: "htttp..."}.
    this.server.use(express.json()); // uso linguagem json pra ser restful e funcionar o req.body
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')) // declara o destino de files publico
    );
  }

  routes() {
    this.server.use(routes); // rotas ficam por la
    this.server.use(Sentry.Handlers.errorHandler()); // ponho depois de tudo
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // quando um middleware recebe 4 elementos o express trata como tratamento de excecoes
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON(); // pego info do error e boto em json
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}
export default new App().server;

// executa o sucrase antes de rodar o node, sucrase suporta import e export diferente
