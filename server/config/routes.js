import { controllers } from '../db'

const usersController = controllers && controllers.users

export default (app) => {
  app.post('/auth-tokens', usersController.login)
  app.post('/users', usersController.signUp)
}
