const Logger = require('release-it/lib/log')

class QuietLogger extends Logger {
  log() { }
}

module.exports = {
  log: new QuietLogger(),
  spinner: { show: () => {} }
}