import Sequelize, { Model } from 'sequelize';
// inicia o static automatico, o super refere ao Model, a classe PAI

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // como eu quero formatar esse valor
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default File;
