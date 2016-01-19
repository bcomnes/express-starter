var baseOptions = [

  {
    name: 'port',
    abbr: 'p',
    help: 'server port'
  },
  {
    name: 'hostname',
    abbr: 'H',
    help: 'hostname the server will be accessed from.  Required for oAuth'
  },
  {
    name: 'sessionSecret',
    abbr: 's',
    help: 'cookie secret'
  },
  {
    name: 'clientId',
    abbr: 'ci',
    help: 'oauth2 client id'
  },
  {
    name: 'clientSecret',
    abbr: 'cs',
    help: 'oauth2 secret'
  },
  {
    name: 'gid',
    help: 'the gid to drop to when binding to ports <=1024'
  },
  {
    name: 'uid',
    help: 'the uid to drop to on when binding to ports <=1024'
  },
  {
    name: 'env',
    help: 'sets the env string for the app: dev or prod'
  },
  {
    name: 'cfg',
    abbr: 'c',
    help: 'path to config.json file'
  },
  {
    name: 'help',
    abbr: 'h',
    help: 'show help',
    boolean: true
  },
  {
    name: 'title',
    abbr: 't',
    help: 'Set the title of the index page'
  },
  {
    name: 'name',
    abbr: 'n',
    help: 'App Name to this.  No spaces!  Determines the prefix of cfg env vars'
  }
]

module.exports = baseOptions
