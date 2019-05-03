#!/usr/bin/env node

const pkg = require('../package.json')
const parseArgs = require('yargs-parser')
const release = require('..')

const aliases = {
  d: 'dry-run',
  h: 'help',
  i: 'increment',
  I: 'interactive',
  t: 'targetPath',
  'target-path': 'targetPath',
  v: 'version',
  V: 'verbose'
}

const args = [].slice.call(process.argv, 2)
const options = parseArgs(args, {
  boolean: ['dry-run', 'help', 'interactive', 'verbose', 'version'],
  alias: aliases
})

if (options.version) {
  version()
} else if(options.help || options._.length === 0) {
  help()
} else {
  release({ ...options, releasePaths: options._ })
}

function help() {
  console.log(`Release 'em! v${pkg.version}

  Usage: release-em <pathToRelease> [pathToRelease] [...] [options]

  Multiple paths can be specified. '*' can be used as a wildcard in paths.

  -d --dry-run           Do not touch or write anything, but show the commands
  -h --help              Print this help
  -i --increment         Increment "major", "minor", "patch", or "pre*" version; or specify version [default: "patch"]
  -I --interactive       Prompt each change
  -t --target-path       Specify the path of the workspace to release
  -v --version           Print version number
  -V --verbose           Verbose output`)
}

function version() {
  console.log(`v${pkg.version}`)
}