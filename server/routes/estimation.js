import * as service from '../api/estimation'
import * as sockets from '../api/util/socket'

export function createEstimation(req, res) {
  service.createEstimation(req.body, function(err, result) {
    sockets.notifyAllListenersOfNewEstimation(result)
    res.status(200).json(result)
  })
}

export function getEstimations(req, res) {
  service.getEstimations(function(err, result) {
    res.status(200).json(result)
  })
}
