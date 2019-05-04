const releasePackages = require('./releasePackages')
const release = require('release-it')
const configuration = require('./configuration')

module.exports = async options => releasePackages(release, configuration(options))