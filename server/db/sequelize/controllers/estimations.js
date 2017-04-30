import _ from 'lodash'
import Models from '../models'
const estimation = Models.estimation
const block = Models.block
const sequelize = Models.sequelize

export function all(req, res) {
  estimation.findAll({ where: { userId: req.params.userId } }).then((estimations) => {
    res.json(estimations)
  }).catch((err) => {
    console.log(err)
    res.status(500).send('Error in first query')
  })
}

export function get(req, res) {
  estimation.findOne({ where: { id: req.params.estimationId }, raw: true }).then((estimation) => {
    return block.findAll({ where: { estimationId: estimation.id }, raw: true }).then((blocks) => {
      res.json({ ...estimation, blocks })
    })
  }).catch((err) => {
    console.log(err)
    res.status(500).send('Error in first query')
  })
}

export function add(req, res) {
  estimation.create({id: req.body.id, userId: req.params.userId}).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

export function remove(req, res) {
  estimation.destroy({ where: { id: req.params.estimationId }, individualHooks: true }).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

export default {
  all,
  add,
  get,
  remove
}
