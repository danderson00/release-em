const incrementVersions = require('./incrementVersions')
const { findPackages, matchingVersions } = require('./packages')
const taskConfigFactory = require('./taskConfigFactory')

module.exports = (release, options) => {
  const releasePackage = taskConfig => {
    process.chdir(taskConfig.path)
    return release(taskConfig.config)
  }
  
  const packages = findPackages(options.targetPath, options.releasePaths)
  const updatedDependencies = incrementVersions(matchingVersions(packages), options.increment, options.preReleaseId)
  const configFactory = taskConfigFactory(options, updatedDependencies)

  return packages.map(configFactory).reduce(
    (promise, taskConfig) => promise.then(() => releasePackage(taskConfig)),
    Promise.resolve()
  )
}