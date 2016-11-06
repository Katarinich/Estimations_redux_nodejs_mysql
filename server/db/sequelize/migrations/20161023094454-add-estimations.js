module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'estimations', {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        totalSum: {
          type: DataTypes.INTEGER
        },
        totalRate: {
          type: DataTypes.INTEGER
        },
        dateCreated: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.fn('NOW')
        },
        dateModified: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.fn('NOW')
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        clientId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'clients',
            key: 'id'
          }
        }
      }
    )
  },

  down(queryInterface) {
    return queryInterface.dropTable('estimations')
  }
}
