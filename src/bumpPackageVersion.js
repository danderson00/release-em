const labels = ['major', 'minor', 'patch', 'build']

const bumpVersion = (version, type) => version.split('.').reduce(
  (newVersion, value, index, oldVersion) => [
    ...newVersion, 
    index < labels.indexOf(type)
      ? oldVersion[index]
      : index === labels.indexOf(type)
        ? +value + 1
        : 0
    ],
  []
).join('.')

module.exports = (packageJson, type = 'patch') => ({
  ...packageJson,
  version: bumpVersion(packageJson.version, type)
})
