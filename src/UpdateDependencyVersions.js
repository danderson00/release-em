const updatePackageVersions = require('./updatePackageVersions')
const { Plugin } = require('release-it')
const fs = require('fs')

module.exports = class UpdateDependencyVersions extends Plugin {
  bump() {
    if(!this.options.updatedDependencies) {
      throw new Error("No dependency information was provided. The UpdateDependencyVersions plugin is intended to be run using the release-em CLI tool.")
    }
    
    const packageJson = JSON.parse(fs.readFileSync('package.json')) // cwd is set by release-em
    const updatedPackageJson = updatePackageVersions(packageJson, this.options.updatedDependencies)
    fs.writeFileSync('package.json', JSON.stringify(updatedPackageJson, null, 2))
  }
}