const releaseConfig = options => ({
  increment: options.increment,
  preReleaseId: options.preReleaseId,
  ...(options.noCommit 
    ? { git: false }
    : options.githubRelease
      ? { git: { release: true } }
      : { }
  ),
  ...options.releaseConfig
})

const nonReleaseConfig = options => ({
  npm: false,
  git: false,
  ...options.nonReleaseConfig
})

const commonConfig = (options, updatedDependencies) => ({
  'non-interactive': !options.interactive,
  'dry-run': options.dryRun,
  verbose: options.verbose,
  plugins: {
    [`${__dirname}/UpdateVersionsPlugin`]: { updatedDependencies },
    [`${__dirname}/CheckCommitsPlugin`]: { },
    [`${__dirname}/CheckScopedPackagePlugin`]: { }
  },
  ...options.commonConfig
})

module.exports = (options, updatedDependencies) => {
  return definition => ({
    path: definition.path,
    release: definition.release,
    config: {
      ...(definition.release ? releaseConfig : nonReleaseConfig)(options),
      ...commonConfig(options, updatedDependencies)
    }
  })
}