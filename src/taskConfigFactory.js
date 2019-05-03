const releaseConfig = options => ({
  ...options.releaseConfig
})

const nonReleaseConfig = options => ({
  npm: false,
  git: false,
  ...options.nonReleaseConfig
})

const commonConfig = (options, updatedDependencies) => ({
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