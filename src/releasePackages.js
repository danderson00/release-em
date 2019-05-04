const incrementVersions = require('./incrementVersions')
const { findPackages, releaseVersions } = require('./packages')
const taskConfigFactory = require('./taskConfigFactory')

module.exports = (release, options) => {
  const releasePackage = async taskConfig => {
    const originalDirectory = process.cwd()
    process.chdir(taskConfig.path)
    return Promise.resolve(release(taskConfig.config))
      .finally(() => process.chdir(originalDirectory))
  }
  
  const packages = findPackages(options.targetPath, options.releasePaths)
  const updatedDependencies = incrementVersions(releaseVersions(packages), options.increment, options.preReleaseId)
  const configFactory = taskConfigFactory(options, updatedDependencies)

  console.log(`Release 'em! found ${packages.length} packages (${packages.filter(x => x.release).length} for release)`)

  return packages.map(configFactory).reduce(
    (promise, taskConfig) => promise.then(
      async results => [...results, await releasePackage(taskConfig)]
    ),
    Promise.resolve([])
  )
}