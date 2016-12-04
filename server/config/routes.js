import { controllers } from '../db'

const usersController = controllers && controllers.users
const estimationsController = controllers && controllers.estimations

export default (app) => {
  app.post('/api/auth-tokens', usersController.login)
  app.post('/api/users', usersController.signUp)

  app.get('/api/estimations', estimationsController.all)
  app.post('/api/estimations', estimationsController.add)
}
