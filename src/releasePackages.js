const incrementVersions = require('./incrementVersions')
const { findPackages, releaseVersions } = require('./packages')
const taskConfigFactory = require('./taskConfigFactory')
const quietReleaseItDi = require('./quietReleaseItDi')

module.exports = (release, options) => {
  const releasePackage = async (taskConfig, getLogMessage, quiet) => {
    const originalDirectory = process.cwd()
    process.chdir(taskConfig.path)
    console.log(getLogMessage(taskConfig))
    return Promise.resolve(release(taskConfig.config, quiet && quietReleaseItDi))
      .finally(() => process.chdir(originalDirectory))
  }

  const releaseAllPackages = (packages, options, updatedDependencies, getLogMessage, quiet) => {
    const configFactory = taskConfigFactory(options, updatedDependencies)
    return packages.map(configFactory).reduce(
      (promise, taskConfig) => promise.then(
        async results => [...results, await releasePackage(taskConfig, getLogMessage, quiet)]
      ),
      Promise.resolve([])
    )
  }
  
  const packages = findPackages(options.targetPath, options.releasePaths)
  const updatedDependencies = incrementVersions(releaseVersions(packages), options.increment, options.preReleaseId)

  console.log(`Release 'em! found ${packages.length} packages (${packages.filter(x => x.release).length} for release)`)

  if(options.validate) {
    console.log('Performing dry run for validation...')
    return releaseAllPackages(packages, { ...options, dryRun: true }, updatedDependencies, getLogMessageFactory(true), true)
      .then(() => releaseAllPackages(packages, options, updatedDependencies, getLogMessageFactory()))
  } else {
    return releaseAllPackages(packages, options, updatedDependencies, getLogMessageFactory())
  }
}

function getLogMessageFactory(validating) {
  return taskConfig => validating
    ? `Validating ${taskConfig.path}`
    : taskConfig.release
      ? `Releasing ${taskConfig.path}`
      : `Updating dependencies in ${taskConfig.path}`
}