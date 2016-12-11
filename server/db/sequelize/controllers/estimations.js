import _ from 'lodash'
import Models from '../models'
const estimation = Models.estimation
const sequelize = Models.sequelize

export function all(req, res) {
  estimation.findAll().then((estimations) => {
    res.json(estimations)
  }).catch((err) => {
    console.log(err)
    res.status(500).send('Error in first query')
  })
}

export function add(req, res) {
  estimation.create(req.body).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

export default {
  all,
  add
}
