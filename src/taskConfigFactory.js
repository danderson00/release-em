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
  'non-interactive': true,
  'dry-run': options['dry-run'],
  plugins: {
    [`${__dirname}/UpdateDependencyVersions`]: { updatedDependencies }
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