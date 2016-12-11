import jwt from 'jsonwebtoken'

import Models from '../models'
const users = Models.users
import { sessionSecret } from '../../../config/secrets'

export function login(req, res, next) {
  users.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User is not found.' })
    }

    return user.comparePassword(req.body.password).then((result) => {
      if(result) {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: user.id
        }, sessionSecret)

        return res.status(200).json({
          token,
          message: 'You have been successfully logged in.'
        })
      }

      return res.status(401).json({ message: 'Wrong email or password.' })
    })
  }).catch((err) =>
    next(err)
  )
}

export function signUp(req, res, next) {
  users.findOne({ where: { email: req.body.email } }).then((existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' })
    }

    const user = users.build({
      email: req.body.email,
      password: req.body.password
    })

    return user.save().then((result) => {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: result.id
      }, sessionSecret)

      return res.status(200).json({
        token,
        message: 'You have been successfully logged in.'
      })
    }).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
  }).catch((err) =>
    next(err)
  )
}

export default {
  login,
  signUp
}
