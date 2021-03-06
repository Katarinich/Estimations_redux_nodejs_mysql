import jwt from 'jsonwebtoken'

import { controllers } from '../db'
import { sessionSecret } from './secrets'

const usersController = controllers && controllers.users
const estimationsController = controllers && controllers.estimations
const blocksController = controllers && controllers.blocks

export default (app) => {
  app.post('/api/auth-tokens', usersController.login)

  app.post('/api/users', usersController.signUp)

  app.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    const isApiRoute = req.originalUrl.indexOf('api') !== -1

    if (isApiRoute) {
      if (token && isApiRoute) {
        jwt.verify(token, sessionSecret, (err, decoded) => {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' })
          }

          req.decoded = decoded
          next()
        })
      } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
      }
    } else {
      next()
    }
  })

  app.get('/api/users/:userId/estimations', estimationsController.all)
  app.post('/api/users/:userId/estimations', estimationsController.add)
  app.get('/api/estimations/:estimationId', estimationsController.get)
  app.delete('/api/estimations/:estimationId', estimationsController.remove)
  app.put('/api/estimations/:estimationId/blocks/:blockId', blocksController.update)
  app.post('/api/estimations/:estimationId/blocks', blocksController.add)
}
