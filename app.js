var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var auth = require('./routes/auth')

// Generic routes
var fallback = require('./routes')
var errors = require('./routes/errors')

var app = express()

function configureApp (conf) {
  app.locals.title = conf.get('title')
  // view engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'jade')

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))

  // set up auth routes
  app.use(auth(conf))

  // Fallback routes
  app.use(fallback)

  // attach error handlers to app to catch errors
  app.use(errors(conf))
}

module.exports = app
module.exports.config = configureApp
