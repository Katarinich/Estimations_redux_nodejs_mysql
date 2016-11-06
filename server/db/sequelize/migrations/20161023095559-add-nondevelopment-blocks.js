module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'nondevelopmentBlocks', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        text: {
          type: DataTypes.STRING,
          allowNull: true
        },
        percent: {
          type: DataTypes.STRING,
          allowNull: true
        },
        rate: {
          type: DataTypes.DOUBLE,
          allowNull: true
        },
        checked: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        estimationId: {
          type: DataTypes.STRING,
          references: {
            model: 'estimations',
            key: 'id'
          }
        }
      }
    )
  },

  down(queryInterface) {
    return queryInterface.dropTable('nondevelopmentBlocks')
  }
}
