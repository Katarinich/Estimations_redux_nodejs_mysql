import chromecon from 'images/chrome-ninja192-precomposed.png'
import applecon from 'images/apple-ninja152-precomposed.png'
import mscon from 'images/ms-ninja144-precomposed.png'
import favicon from 'images/favicon.png'

const config = {
  link: [
    { rel: 'icon', href: favicon },
    { rel: 'icon', sizes: '192x192', href: chromecon },
    { rel: 'apple-touch-icon', sizes: '152x152', applecon },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed', type: 'text/css' },
    { rel: 'stylesheet', href: '/assets/styles/main.css' }
  ],
  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'description', content: 'An isomorphic React alt boilerplate with Express and MongoDB deployable to Heroku' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'React Webpack Node' },
    { name: 'msapplication-TileImage', content: mscon },
    { name: 'msapplication-TileColor', content: '#3372DF' }
  ]
}

export default config
