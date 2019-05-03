const { readdirSync, readFileSync } = require('fs')
const { join } = require('path')

const pathMatches = (path, paths) => paths.some(x => path.replace(/\\/g, '/').includes(x.replace(/\\/g, '/')))
const loadPackageJson = packagePath => JSON.parse(readFileSync(join(packagePath, 'package.json')))

module.exports = {
  matchingVersions: (packages, paths) => (
    packages
      .filter(p => pathMatches(p.path, paths))
      .reduce(
        (versions, p) => ({
          ...versions,
          [p.name]: p.version
        }),
        {}
      )
  ),
  findPackages: from => (
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
                version: packageJson.version
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