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
          allowNull: false,
          defaultValue: 'New estimation'
        },
        totalSum: {
          type: DataTypes.FLOAT,
          defaultValue: 0
        },
        totalRate: {
          type: DataTypes.FLOAT,
          defaultValue: 0
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
          allowNull: true,
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
