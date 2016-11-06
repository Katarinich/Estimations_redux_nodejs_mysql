module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'clients', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
    )
  },

  down(queryInterface) {
    return queryInterface.dropTable('clients')
  }
}
