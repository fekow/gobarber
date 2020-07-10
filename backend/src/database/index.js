import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/user';
import File from '../app/models/file';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment]; // lista todos meus models pra inicializar

class Database {
  constructor() {
    this.init(); // crio um metodo init, que ja rola automatico quando mando pro app (?)
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection)); // os inicializa e passa as config de conexão dentro

    models.map(
      // eslint-disable-next-line no-shadow
      models => models.associate && models.associate(this.connection.models)
    ); // um pequeno hackzin, só roda se a classe tiver a funcao estatica associate
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  }
}
export default new Database();
