export default (sequelize, DataTypes) =>
  sequelize.define('block', {
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
      allowNull: false,
      references: {
        model: 'estimations',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  })
