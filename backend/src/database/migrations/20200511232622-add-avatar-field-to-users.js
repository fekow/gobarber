// crio uma nova migration e so coloco a coluna que quero, ao invez de editar aquela outra
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' }, // pego o o id do files como foreign key
      onUpdate: 'CASCADE', // modificar na tabela modifica aqui tamem
      onDelete: 'SET NULL', // se deletaram na tabela fica null
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
// add column -- adiciono uma coluna nessa tabela
// que é chamada de ...
