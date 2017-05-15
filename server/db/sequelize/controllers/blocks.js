import util from 'util'

import Models from '../models'

const block = Models.block

export function update(req, res) {
  block.update({ ...req.body }, { where: { id: req.params.blockId } }).then(() => {
    res.status(200).send('OK')
  }).catch((err) => {
    console.log(err)
    res.status(500).send('Error in first query')
  })
}

export function add(req, res) {
  req.checkBody('parentBlockId', 'Invalid parentBlockId or null').notEmpty().isInt()
  req.checkBody('index', 'Invalid index').notEmpty().isInt()
  req.checkBody('estimationId', 'Invalid estimationId or null').notEmpty()

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        res.status(422).send('There have been validation errors: ' + util.inspect(result.array()))
        throw new Error()
      }

      const options = {
        where: { 
          parentBlockId: req.body.parentBlockId, 
          index: { 
            gte: req.body.index
          }
        },
        raw: true
      }

      return block.findAll(options)
    })
    .then(blocks => {
      const blockPromises = []
      for (let i = 0; i < blocks.length; i++) {
        blockPromises.push(block.update({ ...blocks[i], index: blocks[i].index + 1 }, { where: { id: blocks[i].id } }))
      }
      
      return Promise.all(blockPromises)
    })
    .then(() => {
      return block.create({ ...req.body })
    })
    .then(result => {
      res.json(result.id)
    })
    .catch(err => {
      if (!res.headersSent) {
        res.status(400).send(err.message)
      }
    })
}

export default {
  update,
  add
}
