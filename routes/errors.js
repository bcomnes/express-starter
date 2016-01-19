var router = require('express').Router()

// error handlers

// catch 404 and forward to error handler
function configure (conf) {
  router.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  if (conf.get('env') === ('prod')) {
    router.use(prodErrorHandler)
  } else {
    router.use(devErrorHandler)
  }

  return router
}

// development error handler
// will print stacktrace
function devErrorHandler (err, req, res, next) {
  console.error(err)
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
}

// production error handler
// no stacktraces leaked to user
function prodErrorHandler (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
}

module.exports = configure
