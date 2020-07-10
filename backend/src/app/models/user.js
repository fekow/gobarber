import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
// inicia o static automatico, o super refere ao Model, a classe PAI

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      }, // password .VIRTUAL quer dizer que ela so vai existir temporariamente ate fim da funcao, nesse caso criar o hash que sera armazenado
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); // igual o schema.pre(save) do mongoose, se tem senha no req.body, ele transforma no hash e armazena no campo, ele verifica, pois esse caminho pode ser usado pra update tambem

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // salva a referencia do id do arquivo e o chama de avatarid
  }

  // salva nome como file
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // metodo para encryptar a senha inserida pra autenticar com a db
  }
}

export default User;
