const { inc } = require('semver')

module.exports = (packages, increment, preReleaseId) => (
  // this simply applies the specified versioning policy (major, minor, patch, etc.)
  // to each package version. we could also keep all in sync by finding the highest
  // version and incrementing that
  Object.keys(packages).reduce(
    (newPackages, packageName) => ({
      ...newPackages,
      [packageName]: inc(packages[packageName], increment, preReleaseId)
    }),
    {}
  )
)