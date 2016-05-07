import * as service from '../api/block'

export function createBlocks(req, res) {
  service.createBlocks(req.body.id, function() {
    res.status(200).json({})
  })
}
