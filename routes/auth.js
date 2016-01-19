var router = require('express').Router()
var passport = require('passport')
var flash = require('connect-flash')
var session = require('express-session')
var LevelStore = require('level-session-store')(session)
var methodOverride = require('method-override')

function configureRoute (conf) {
  if (!conf.get('host')) throw new Error('Missing callback hostname')
  if (!conf.get('sessionSecret')) throw new Error('Missing session secret')
  if (!conf.get('clientId')) throw new Error('Missing clientId')
  if (!conf.get('clientSecret')) throw new Error('Missing clientSecret')

  var host = conf.get('host')
  var port = conf.get('port')
  // var GOOGLE_CLIENT_ID = conf.get('clientId')
  // var GOOGLE_CLIENT_SECRET = conf.get('clientSecret')
  var sessionSecret = conf.get('sessionSecret')
  var hostname = port === 80 ? host : [ host, port ].join(':')
  // var callbackURL = 'http://' + hostname + '/auth/google/callback'

  router.use(methodOverride('X-HTTP-Method-Override'))
  router.use(flash())

  var sessionParser = session({
    resave: true,
    secret: sessionSecret,
    saveUninitialized: false,
    store: new LevelStore()
  })

  router.use(sessionParser)

  router.use(passport.initialize())
  router.use(passport.session())

  // used with session serialization to control how much info sessions store
  // See http://passportjs.org/docs#sessions
  passport.serializeUser(serializePassthrough)
  passport.deserializeUser(serializePassthrough)

  // Register a login page
  router.get('/login', loginRoute)

  // Logout
  router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}

function loginRoute (req, res) {
  res.render('login', {
    messages: req.flash('error'),
    user: req.user
  })
}

function register (accessToken, refreshToken, profile, done) {
  // This can be used to prevent people from logging in.
  // But lets let everyone login, and enforce access on a
  // per site/app level.
  return done(null, profile)
}

function serializePassthrough (user, done) {
  // Store everything yo
  done(null, user)
}

// Protect routes with ensureAuthenticated
function reqireAuth (req, res, next) {
  // console.log('checking authentication')
  if (req.isAuthenticated()) { return next() }
  res.redirect('/login')
}

module.exports = configureRoute
module.exports.reqAuth = reqireAuth
