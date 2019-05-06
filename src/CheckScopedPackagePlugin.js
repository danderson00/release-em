const { Plugin } = require('release-it')
const { readFileSync } = require('fs')

module.exports = class CheckScopedPackagePlugin extends Plugin {
  beforeBump() {
    this.check(JSON.parse(readFileSync('package.json'))) // cwd is set by release-em
  }

  check(packageJson) {
    if(
      packageJson.name.startsWith('@') && 
      !packageJson.private && 
      (
        !packageJson.publishConfig || 
        !packageJson.publishConfig.access || 
        packageJson.publishConfig.access !== 'public'
      ) 
    ) {
      throw new Error(
        'Package appears to be scoped and public but access configuration is not set. ' +
        'Add `"publishConfig": { "access": "public" }` to your package.json file.'
      )
    }
  }
}