import express from 'express'
import webpack from 'webpack'
import { ENV } from './config/appConfig'
import { connect } from './db'
import expressConfig from './config/express'
import routesConfig from './config/routes'
const App = require('../public/assets/server')
const app = express()

connect()

if (ENV === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client')
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

expressConfig(app)

routesConfig(app)

app.get('*', App.default)

app.listen(app.get('port'))
