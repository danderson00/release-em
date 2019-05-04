const { Plugin } = require('release-it')

const readOnlyOperation = { options: { write: false } }

module.exports = class CheckUpstreamPlugin extends Plugin {
  async beforeBump() {
    if(!!this.config.options.git) {
      await this.exec('git remote update', readOnlyOperation)

      const branch = await this.exec('git rev-parse --abbrev-ref HEAD', readOnlyOperation)
      const remoteBranch = await this.exec('git rev-parse --abbrev-ref --symbolic-full-name @{u}', readOnlyOperation)

      const upstreamCommits = Number(await this.exec(
        `git rev-list ${branch}..${remoteBranch} --count`, 
        readOnlyOperation
      ))

      if(upstreamCommits === NaN) {
        throw new Error('Unable to determine if upstream remote has unfetched commits. Aborting.')
      }

      if(upstreamCommits > 0) {
        throw new Error(`The current branch is ${upstreamCommits} commit(s) behind its remote counterpart. Aborting.`)
      }
    }
  }
}