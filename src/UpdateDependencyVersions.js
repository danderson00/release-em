const { Plugin } = require('release-it')
// const fs = require('fs')
// const path = require('path')

module.exports = class UpdateDependencyVersions extends Plugin {
  bump() {
    const { updatedDependencies } = this.options
    if(!updatedDependencies) {
      throw new Error("No dependency information was provided. The UpdateDependencyVersions plugin is intended to be run using the release-em CLI tool.")
    }
  }
}