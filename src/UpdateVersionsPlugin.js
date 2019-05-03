const updatePackageVersions = require('./updatePackageVersions')
const { Plugin } = require('release-it')
const fs = require('fs')

module.exports = class UpdateVersionsPlugin extends Plugin {
  // if the npm release-it plugin is disabled, the name and versions are not populated
  // this is a bit of a workaround, but the versions it reports are incorrect (it's not upgrading at all...)
  getName() {
    return JSON.parse(fs.readFileSync('package.json')).name
  }

  bump() {
    if(!this.options.updatedDependencies) {
      throw new Error("No dependency information was provided. The UpdateVersionsPlugin plugin is intended to be run using the release-em CLI tool.")
    }
    
    this.log.exec('Updating dependencies', this.global.isDryRun)

    if(!this.global.isDryRun) {
      const packageJson = JSON.parse(fs.readFileSync('package.json')) // cwd is set by release-em
      const updatedPackageJson = updatePackageVersions(packageJson, this.options.updatedDependencies)
      fs.writeFileSync('package.json', JSON.stringify(updatedPackageJson, null, 2))
    }
  }
}