const { resolve } = require('path')

const defaultConfig = {
  targetPath: '.',
  increment: 'patch'
}

const tryLoadConfig = path => {
  let config = {}
  try { config = require(path) } catch(error) { }
  return config
}

module.exports = runtimeConfig => {
  const workspaceConfig = tryLoadConfig(resolve(runtimeConfig.targetPath, runtimeConfig.configPath || 'release-em'))
  const workspaceManifestConfig = tryLoadConfig(resolve(runtimeConfig.targetPath, 'package.json'))['release-em']

  return validateOptions({ ...defaultConfig, ...workspaceManifestConfig, ...workspaceConfig, ...runtimeConfig })
}

const validateOptions = options => {
  if(!options.releasePaths || options.releasePaths.length === 0) {
    throw new Error(`You must specify at least one release path ({ releasePaths: ["myPackage"] })`)
  }
  return options
}
