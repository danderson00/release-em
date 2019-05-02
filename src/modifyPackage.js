const { writeFileSync } = require('fs')
const { join } = require('path')

module.exports = (path, modify) => {
  const packageFileName = join(path, 'package.json')
  try {
    const oldPackage = require(packageFileName)
    const newPackage = modify(oldPackage)
    writeFileSync(packageFileName, JSON.stringify(newPackage, null, 2))
  } catch(error) {
    console.error(`Error modifying ${packageFileName}`, error)
  }
}