import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from 'routes';
import configureStore from 'store/configureStore';
import * as types from 'types';
import header from 'components/Meta';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

export default function render(req, res) {
  const history = createMemoryHistory();

  const store = configureStore({}, history);
  const routes = createRoutes(store);

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
        const initialState = store.getState();

        res.status(200).send(`
          <!doctype html>
          <html ${header.htmlAttributes.toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            </head>
            <body>
              <div id="app"></div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
              <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
            </body>
          </html>
        `);
    } else {
      res.sendStatus(404);
    }
  });
}
