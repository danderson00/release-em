const { readdirSync } = require('fs')
const { join } = require('path')

const pathMatches = (path, paths) => paths.some(x => path.replace(/\\/g, '/').includes(x.replace(/\\/g, '/')))

module.exports = (from, paths) =>
  readdirSync(from, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && pathMatches(join(from, entry.name), paths))
    .map(entry => join(from, entry.name))
