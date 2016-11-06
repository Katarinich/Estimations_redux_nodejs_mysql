module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: 'user'
        }
      }
    ).then(() =>
      queryInterface.addIndex(
        'users',
        [DataTypes.fn('lower', DataTypes.col('email'))],
        {
          indexName: 'users_email',
          indicesType: 'unique'
        }
      )
    )
  },

  down(queryInterface) {
    return queryInterface.dropTable('users')
  }
}
