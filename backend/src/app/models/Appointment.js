import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';
// inicia o static automatico, o super refere ao Model, a classe PAI

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL, // crio esse pra ver se o appointment ja passou ou nao
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancellable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
