export default (sequelize, DataTypes) =>
  sequelize.define('client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
