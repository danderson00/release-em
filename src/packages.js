const { readdirSync, readFileSync } = require('fs')
const { join } = require('path')

const isReleasePackage = (directoryName, releasePaths) => releasePaths.some(x => 
  !!(new RegExp(`^${x.replace(/\*/g, '.*')}$`)).exec(directoryName)
)

const loadPackageJson = packagePath => JSON.parse(readFileSync(join(packagePath, 'package.json')))

module.exports = {
  releaseVersions: packages => (
    packages
      .filter(p => p.release)
      .reduce(
        (versions, p) => ({
          ...versions,
          [p.name]: p.version
        }),
        {}
      )
  ),
  findPackages: (from, releasePaths) => (
    readdirSync(from, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .reduce(
        (packages, entry) => {
          const packagePath = join(from, entry.name)
          try {
            const packageJson = loadPackageJson(packagePath)
            return [
              ...packages,
              {
                path: packagePath,
                name: packageJson.name,
                version: packageJson.version,
                release: isReleasePackage(entry.name, releasePaths)
              }
            ]
          } catch(error) {
            return packages
          }
        },
        []
      )
  )     
}