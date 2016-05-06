import * as service from '../api/estimation'

export function createEstimation(req, res) {
  service.createEstimation(req.body, function() {
    res.status(200).json({})
  })
}

export function getEstimations(req, res) {
  service.getEstimations(function(err, result) {
    res.status(200).json(result)
  })
}
