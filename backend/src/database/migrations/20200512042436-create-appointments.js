module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // pego o o id do user q fez agendamento
        onUpdate: 'CASCADE', // modificar na tabela modifica aqui tamem
        onDelete: 'SET NULL', // se deletaram na tabela fica null, pode manter historico de agendamentos
        allowNull: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // pego o o id do user q fez agendamento
        onUpdate: 'CASCADE', // modificar na tabela modifica aqui tamem
        onDelete: 'SET NULL', // se deletaram na tabela fica null, pode manter historico de agendamentos
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  // created e updated são criados automaticamente pelo sequelize, provider ve se e cliente ou gestor
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
