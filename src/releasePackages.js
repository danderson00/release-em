const incrementVersions = require('./incrementVersions')
const { findPackages, releaseVersions } = require('./packages')
const taskConfigFactory = require('./taskConfigFactory')

module.exports = (release, options) => {
  const releasePackage = async taskConfig => {
    const originalDirectory = process.cwd()
    process.chdir(taskConfig.path)
    await release(taskConfig.config)
    process.chdir(originalDirectory)
  }
  
  const packages = findPackages(options.targetPath, options.releasePaths)
  const updatedDependencies = incrementVersions(releaseVersions(packages), options.increment, options.preReleaseId)
  const configFactory = taskConfigFactory(options, updatedDependencies)

  return packages.map(configFactory).reduce(
    (promise, taskConfig) => promise.then(() => releasePackage(taskConfig)),
    Promise.resolve()
  )
}