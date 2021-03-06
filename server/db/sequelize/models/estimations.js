export default (sequelize, DataTypes) => {
  const estimation = sequelize.define('estimation', {
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
      defaultValue: sequelize.fn('NOW')
    },
    dateModified: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  }, {
    timestamps: false,
    hooks: {
      afterCreate(createdEstimation) {
        const block = sequelize.models.block
        block.create({estimationId: createdEstimation.id, index: 0}).then(result => {
          block.create({estimationId: createdEstimation.id, index: 0, parentBlockId: result.id})
        })
      },
      beforeDestroy(estimationToDelete) {
        const block = sequelize.models.block
        block.destroy({ where: { estimationId: estimationToDelete.id } })
      }
    }
  })

  return estimation
}
