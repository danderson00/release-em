# Release 'em!

CLI release tool for multiple packages, built on [**Release It!**](https://github.com/release-it/release-it)

**Release 'em!** automates the tedious tasks of software releases. It does all 
of the great things that **Release It!** does, like bump versions, tag source 
repos, changelogs, etc., and also coordinates this across multiple packages,
keeping local dependency versions in sync across your packages. 

It works especially well when used in conjunction with 
[yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).
It also works equally well with both mono- and multi-repo configurations.

## Installation

It is recommended that **Release 'em!** is either installed globally or used
programmatically (see [below](#using-release-em-programmatically)).

```bash
yarn add --global release-em
```

## Usage

```bash
release-em <releaseDirectory> [releaseDirectory] [...] [options]
```

Multiple directories can be specified. Any valid [glob expression](https://www.npmjs.com/package/glob#glob-primer)
can be used. Directories must be immediate children of the workspace root.

Use of the `--validate` option is highly recommended! It will perform an 
initial dry run and prevent partially completed releases due to minor errors 
like unstaged changes in a package.

Use the `--verbose` option to see what local dependencies are affected in each
package.

**Release 'em!** will terminate on the first error encountered.

Options are as follows:

| | | |
-|-|-
-c|--config       |Specify the configuration file path
-d|--dry-run      |Do not touch or write anything, but show the commands
-h|--help         |Print these options
-i|--increment    |Increment "major", "minor", "patch", or "pre*" version; or specify version [default: "patch"]
-I|--interactive  |Prompt each change
-n|--no-commit    |Don't create a git commit or tag for released packages
-p|--prerelease-id|Tag to use for prerelease versions
-r|--release      |Create a github release for packages being released
-t|--target-path  |Specify the path of the workspace to release
| |--validate     |Perform a quiet dry run first for validation
-v|--version      |Print version number
-V|--verbose      |Verbose output

### Using With Mono-Repo Configurations

By default, **Release 'em!** will create a git commit in each package 
directory. For mono-repo configurations, this would create multiple commits
in the same repo. Use the `--no-commit` option to prevent this from happening.

Note that no checks for uncommitted / unstaged changes in the repository are 
made when this option is enabled, and changes are not committed, tagged or
pushed.

### Enabling Automatic Github Releases

Automatic creation of [github releases](https://help.github.com/articles/creating-releases/) 
using the `--github-release` option requires the configuration of a github 
personal access token. Follow the **Release It!** [instructions](https://github.com/release-it/release-it#github-releases) 
for obtaining and configuring a token, skipping "Configure `github.release: true`".

### Examples

```bash
release-em tools.*
```

Release a new patch for packages in directories starting with `tools.`. 
Any dependant packages in the workspace will have the dependency
sections of their `package.json` updated accordingly.

```bash
release-em tools.* libraries.* -i premajor -p alpha -t packages
```

Release a new alpha version of packages in directories starting with `tools.` 
or `libraries.` in the `packages` directory.

```bash
release-em !+(app|admin) -i minor --validate
```

Release a new minor version of everything except the `app` or `admin` packages, 
performing a validation run before any changes are made.

## Configuration

**Release 'em!** uses the default **Release It!** configuration for packages 
being released (bump version, publish, tag, changelog), as well as updating 
local dependency versions for packages in the workspace not being released.

Additional configuration can be specified by either adding a `release-em` 
section to the workspace root `package.json` file: 

```JSON
{
  "private": true,
  "workspaces": [
    "app*"
  ],
  "release-em": {
    "preReleaseId": "alpha"
  }
}
```

by creating a file named `release-em.json`:

```JSON
{
  "preReleaseId": "alpha"
}
```

or `release-em.js`:

```Javascript
module.exports = {
  preReleaseId: "alpha"
}
```

The complete list of configuration options appears below:

Name|Default|Description
-|-|-
commonConfig||**Release It!** specific configuration for all packages
configPath|'release-em'|Specify the configuration file path
dryRun|false|Do not touch or write anything, but show the commands
githubRelease|false|Create a github release for packages being released
increment|'patch'|Increment "major", "minor", "patch", or "pre*" version; or specify version
interactive|false|Prompt each change
noCommit|false|Don't create a git commit or tag for released packages
nonReleaseConfig||**Release It!** specific options for packages not being released
preReleaseId||Prerelease tag name, e.g. "alpha"
releaseConfig||**Release It!** specific options for packages being released
releasePaths||An array of directory names of packages to release. Use `*` as a wildcard.
targetPath|'.'|Specify the path of the workspace to release
validate|false|Perform a quiet dry run first for validation
verbose|false|Verbose output

The **Release It!** configuration for individual packages can be set by 
creating a `.release-it.json` or a `release-it` section in the `package.json` 
file for each package. Be aware that the options specified in **Release 'em!**
configuration will override these individual settings.

Please see the **Release It!** [documentation](https://github.com/release-it/release-it#configuration) and 
[default options](https://github.com/release-it/release-it/blob/master/conf/release-it.json)
for details on configuring **Release It!**

### Examples

By default, **Release 'em!** won't create git commits for packages not being
published. To create a commit for these packages as well using the workspace
root `package.json` file:

```JSON
{
  "private": true,
  "workspaces": [
    "app",
    "tools.*"
  ],
  "release-em": {
    "nonReleaseConfig": {
      "git": {
        "commit": true,
        "commitMessage": "Update dependencies",
        "tag": false,
        "push": true    
      }
    }
  }
}
```

To customise the commit message for released packages using a Javascript 
configuration file:

```Javascript
const os = require('os')

module.exports = {
  releaseConfig: {
    git: {
      commitMessage: `Release \${version} at ${new Date().toUTCString()} from ${os.hostname()}`
    }
  }
}
```

## Using **Release 'em!** Programmatically

**Release 'em!** has a very simple API, exposing a single function expecting
an object with configuration data, as described [above](#configuration). The 
function returns a promise that will resolve with an array of the results for 
each call to **Release It!** or reject with the reason for failure.

```Javascript
const release = require('release-em')
const results = await release({
  preReleaseId: 'beta',
  increment: 'premajor'
})
console.log(JSON.stringify(results, null, 2))
```

## Credits

All the folks involved with [**Release It!**](https://github.com/release-it/release-it)

Thanks for your hard work and dedication to the community!