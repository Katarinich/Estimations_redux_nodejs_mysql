import { Router } from 'express'
import initialRender from '../index'

import * as estimation from './estimation'
import * as block from './block'

export default (app) => {
  const router = Router()

  router.get('/', initialRender)

  router.route('/api/estimation')
  .post(estimation.createEstimation)

  router.get('/api/estimations', estimation.getEstimations)


  router.route('/api/blocks')
  .post(block.createBlocks)

  app.use(router)
}
