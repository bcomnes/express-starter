var path = require('path')
var cc = require('config-chain')
var name = require('../package.json').name

// See https://github.com/dominictarr/config-chain

function generateConf (argv) {
  var env = argv.env || 'dev'
  var appName = argv.name || name
  var conf = cc(
    // ARGV TRUMPS ALL!!!
    argv,

    // ENV VARS PREFIXED WITH require('../package.json').name + '_'
    cc.env(appName + '_'),

    // LOAD IN CONFIG FILE SPECIFIED FROM ARGV
    argv.cfg ? path.resolve(argv.cfg) : null,

    // ZOMG DON"T COMMIT THESE TO GIT
    cc.find('secrets.json'),

    // ENV CONFIG FILES at Root
    cc.find('config.' + env + '.json'),

    // DEFAULTS GO LAST
    {
      host: '127.0.0.1',
      port: 8000,
      env: env,
      auth: true,
      name: appName
    }
  )

  return conf
}

module.exports = generateConf
