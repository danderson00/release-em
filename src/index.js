const releasePackages = require('./releasePackages')
const release = require('release-it/lib/tasks') // require tasks directly to enable DI - see https://github.com/release-it/release-it/issues/518#issuecomment-489313198
const configuration = require('./configuration')

module.exports = async options => releasePackages(release, configuration(options))