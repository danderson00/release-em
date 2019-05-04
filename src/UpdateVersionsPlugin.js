const updatePackageVersions = require('./updatePackageVersions')
const affectedDependencies = require('./affectedDependencies')
const { Plugin } = require('release-it')
const fs = require('fs')

module.exports = class UpdateVersionsPlugin extends Plugin {
  // if the npm release-it plugin is disabled, the name and versions are not populated
  // this is a bit of a workaround, but the versions it reports are also incorrect (it's not upgrading at all...)
  getName() {
    return JSON.parse(fs.readFileSync('package.json')).name
  }

  bump() {
    const { updatedDependencies } = this.options

    if(!updatedDependencies) {
      throw new Error("No dependency information was provided. The UpdateVersionsPlugin plugin is intended to be run using the release-em CLI tool.")
    }
    
    const packageJson = JSON.parse(fs.readFileSync('package.json')) // cwd is set by release-em

    this.log.exec('Updating dependencies', this.global.isDryRun)
    this.log.verbose('Affected dependencies:', JSON.stringify(
      affectedDependencies(packageJson, updatedDependencies), null, 2
    ))

    if(!this.global.isDryRun) {
      const updatedPackageJson = updatePackageVersions(packageJson, updatedDependencies)
      fs.writeFileSync('package.json', JSON.stringify(updatedPackageJson, null, 2))
    }
  }
}