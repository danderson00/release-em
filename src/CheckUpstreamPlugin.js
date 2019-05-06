const { Plugin } = require('release-it')

const readOnlyOperation = { options: { write: false } }

module.exports = class CheckUpstreamPlugin extends Plugin {
  async beforeBump() {
    if(!!this.config.options.git) {
      await this.exec('git fetch', readOnlyOperation)

      const status = await this.exec(`git status -sb`, readOnlyOperation)
      const commitDifference = status.match(/\[(.*)]/)

      if(commitDifference) {
        throw new Error(`The current branch is ${commitDifference} commit(s) compared with its remote counterpart. Aborting.`)
      }
    }
  }
}