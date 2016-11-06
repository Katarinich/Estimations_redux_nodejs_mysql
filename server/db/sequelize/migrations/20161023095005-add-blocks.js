module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'blocks', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        text: {
          type: DataTypes.STRING,
          allowNull: true
        },
        hours: {
          type: DataTypes.STRING,
          allowNull: true
        },
        rate: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        index: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        parentBlockId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'blocks',
            key: 'id'
          }
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
    return queryInterface.dropTable('blocks')
  }
}
