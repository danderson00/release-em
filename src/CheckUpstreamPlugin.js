const { Plugin } = require('release-it')

const options = { write: false }

module.exports = class CheckUpstreamPlugin extends Plugin {
  async beforeBump() {
    if(!!this.config.options.git) {
      await this.exec('git remote update', { options })
      const remote = await this.exec('git remote show', { options })

      const upstreamCommits = Number(await this.exec(
        `git rev-list HEAD..${remote}/HEAD --count`, 
        { options }
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