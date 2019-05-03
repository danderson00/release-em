const releasePackages = require('./releasePackages')
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

module.exports = async options => {
  const originalDirectory = process.cwd()
  await releasePackages(release, validateOptions({ ...defaultOptions, ...options }))
  process.chdir(originalDirectory)
}