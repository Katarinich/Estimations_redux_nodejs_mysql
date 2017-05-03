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

export default {
  update
}
