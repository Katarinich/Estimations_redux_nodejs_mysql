export default (sequelize, DataTypes) => {
  const estimation = sequelize.define('estimation', {
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
      defaultValue: sequelize.fn('NOW')
    },
    dateModified: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
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
  }, {
    timestamps: false
  })

  return estimation
}
