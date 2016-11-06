export default (sequelize, DataTypes) =>
  sequelize.define('nondevelopmentBlock', {
    id: {
      type: DataTypes.STRING,
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    estimation_id: {
      type: DataTypes.STRING,
      references: {
        model: 'estimations',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  })
