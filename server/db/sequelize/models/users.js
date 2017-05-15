import Promise from 'bluebird'
import bcryptNode from 'bcrypt-nodejs'

const bcrypt = Promise.promisifyAll(bcryptNode)

/* eslint-disable no-param-reassign */
function hashPassword(user) {
  if (!user.changed('password')) {
    return null
  }
  
  return bcrypt.genSaltAsync(5).then((salt) =>
    bcrypt.hashAsync(user.password, salt, null).then((hash) => {
      user.password = hash
    })
  )
}
/* eslint-enable no-param-reassign */

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  }, {
    timestamps: false,

    instanceMethods: {
      comparePassword(candidatePassword) {
        return bcrypt.compareAsync(candidatePassword, this.password)
      }
    }
  })

  users.beforeCreate(hashPassword)
  users.beforeUpdate(hashPassword)

  return users
}
