const releaseConfig = options => ({
  increment: options.increment,
  preReleaseId: options.preReleaseId,
  ...options.releaseConfig
})

const nonReleaseConfig = options => ({
  npm: false,
  git: false,
  ...options.nonReleaseConfig
})

const commonConfig = (options, updatedDependencies) => ({
  'non-interactive': !options.interactive,
  'dry-run': options['dry-run'],
  verbose: options.verbose,
  plugins: {
    [`${__dirname}/UpdateVersionsPlugin`]: { updatedDependencies }
  },
  ...options.commonConfig
})

module.exports = (options, updatedDependencies) => {
  return definition => ({
    path: definition.path,
    config: {
      ...(definition.release ? releaseConfig : nonReleaseConfig)(options),
      ...commonConfig(options, updatedDependencies)
    }
  })
}