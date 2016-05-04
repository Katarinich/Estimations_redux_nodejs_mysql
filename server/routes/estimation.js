import * as service from '../api/estimation'

export function createEstimation(req, res) {
  service.createEstimation(req.body, function() {
    res.status(200).end()
  })
}
