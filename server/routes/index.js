import { Router } from 'express'
import initialRender from '../index'

import * as estimation from './estimation'

export default (app) => {
  const router = Router()

  router.get('/', initialRender)

  router.route('/api/estimation')
  .post(estimation.createEstimation)

  router.get('/api/estimations', estimation.getEstimations)

  app.use(router)
}