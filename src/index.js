const incrementVersions = require('./incrementVersions')
const { findPackages, matchingVersions } = require('./packages')
const taskConfigFactory = require('./taskConfigFactory')
const release = require('release-it')

const defaultOptions = {
  targetPath: '.'
}

const validateOptions = options => {
  if(!options.releasePaths || options.releasePaths.length === 0) {
    throw new Error(`You must specify at least one release path ({ releasePaths: ["myPackage"] })`)
  }
  return options
}

module.exports = options => {
  const { targetPath, releasePaths } = validateOptions({ ...defaultOptions, ...options })
  const packages = findPackages(targetPath, releasePaths)
  const updatedDependencies = incrementVersions(matchingVersions(packages))
  const configFactory = taskConfigFactory(options, updatedDependencies)
  const tasks = packages.map(configFactory)
}