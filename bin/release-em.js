#!/usr/bin/env node

const pkg = require('../package.json')
const parseArgs = require('yargs-parser')
const release = require('..')

const aliases = {
  c: 'configPath',
  config: 'configPath',
  d: 'dryRun',
  'dry-run': 'dryRun',
  h: 'help',
  i: 'increment',
  I: 'interactive',
  n: 'noCommit',
  'no-commit': 'noCommit',
  t: 'targetPath',
  'target-path': 'targetPath',
  v: 'version',
  V: 'verbose'
}

const args = [].slice.call(process.argv, 2)
const options = parseArgs(args, {
  boolean: ['dryRun', 'help', 'interactive', 'noCommit', 'validate', 'verbose', 'version'],
  alias: aliases
})

if (options.version) {
  version()
} else if(options.help || options._.length === 0) {
  help()
} else {
  release({ ...options, releasePaths: options._ })
    .catch(error => {/* errors are already logged to console - just suppress unhandled exceptions in the CLI */})
}

function help() {
  console.log(`Release 'em! v${pkg.version}

  Usage: release-em <pathToRelease> [pathToRelease] [...] [options]

  Multiple directories can be specified. '*' can be used as a wildcard in 
  directory names. Directories should be immediate children of the workspace
  root.
  
  -c --config        Specify the configuration file path
  -d --dry-run       Do not touch or write anything, but show the commands
  -h --help          Print this help
  -i --increment     Increment "major", "minor", "patch", or "pre*" version; 
                     or specify version [default: "patch"]
  -I --interactive   Prompt each change
  -n --no-commit     Don't create a git commit or tag for released packages
  -t --target-path   Specify the path of the workspace to release
     --validate      Perform a quiet dry run first for validation
  -v --version       Print version number
  -V --verbose       Verbose output`)
}

function version() {
  console.log(`v${pkg.version}`)
}