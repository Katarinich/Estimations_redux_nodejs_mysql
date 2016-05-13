import React from 'react'
import { Route} from 'react-router'

import EstimationApp from './containers/EstimationApp'
import Estimation from './containers/Estimation'

export const routes = (
  <div>
    <Route path="/" component={EstimationApp} />
    <Route path="/estimation/:id" component={Estimation} />
  </div>
)
