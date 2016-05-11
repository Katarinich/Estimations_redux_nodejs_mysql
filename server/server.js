import express from 'express'
import { Server } from 'http'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import bodyParser from 'body-parser'

import socket from './api/util/socket'
import routesConfig from './routes'
import config from '../webpack.config'

const app = express()
const server = Server(app)
const port = 3000

socket.setServer(server)

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routesConfig(app)

server.listen(port, (error) => {
  if (error)
    console.error(error)
  else {
    console.info('----------')
    console.info(`Server listening on port ${port}.`)
    console.info('==========')
  }
})
