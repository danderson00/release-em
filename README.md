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

Multiple directories can be specified. '*' can be used as a wildcard in 
directory names. Directories should be immediate children of the workspace
root.

Use the `--verbose` option to see what local dependencies are affected in each
package.

Options are as follows.

| | | |
-|-|-
-c|--config|Specify the configuration file path
-d|--dry-run|Do not touch or write anything, but show the commands
-h|--help|Print these options
-i|--increment|Increment "major", "minor", "patch", or "pre*" version; or specify version [default: "patch"]
-I|--interactive|Prompt each change
-t|--target-path|Specify the path of the workspace to release
-v|--version|Print version number
-V|--verbose|Verbose output

**Release 'em!** will terminate on the first error encountered.

### Examples

```bash
release-em tools.*
```

Release a new patch of packages in directories starting with `tools.`. 
Any dependant packages in the workspace will have the dependency
sections of their `package.json` updated accordingly.

```bash
release-em tools.* libraries.* -i major
```

Release a new major version of packages in directories starting with `tools.` 
or `libraries.`.

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
increment|'patch'|Increment "major", "minor", "patch", or "pre*" version; or specify version
interactive|false|Prompt each change
nonReleaseConfig||**Release It!** specific options for packages not being released
preReleaseId||Prerelease tag name, e.g. "alpha"
releaseConfig||**Release It!** specific options for packages being released
releasePaths||An array of directory names of packages to release. Use `*` as a wildcard.
targetPath|'.'|Specify the path of the workspace to release
verbose|false|Verbose output

The **Release It!** configuration for individual packages can be set by 
creating a `.release-it.json` or a `release-it` section in the `package.json` 
file for each package. Be aware that the options specified in **Release 'em!**
configuration will override these individual settings.

Please see the **Release It!** [documentation](https://github.com/release-it/release-it#configuration) and 
[default options](https://github.com/release-it/release-it/blob/master/conf/release-it.json)
for details on configuring **Release It!**.

### Examples

By default, **Release 'em!** won't create git commits for packages not being
published. To create a commit for these packages as well, using a JSON file:

```JSON
{
  "nonReleaseConfig": {
    "git": {
      "commit": true,
      "commitMessage": "Update dependencies",
      "tag": false,
      "push": true    
    }
  }
}
```

By default, **Release 'em!** will create a git commit in each package 
directory. For mono-repo configurations, this would create multiple commits
in the same repo. To stop this from happening:

```JSON
{
  "releaseConfig": {
    "git": false
  }
}
```

To customise the commit message for released packages using a Javascript file:

```Javascript
module.exports = {
  releaseConfig: {
    git: {
      commitMessage: `Release \${version} at ${new Date()}`
    }
  }
}
```

## Using **Release 'em!** Programmatically

**Release 'em!** has a very simple API, exposing a single function expecting
an object with configuration data, as described above. The function returns a
promise that will resolve with an array of the results for each call to
**Release It!** or reject with the reason for failure.

```Javascript
const release = require('release-em')
const results = await release({
  preReleaseId: 'beta',
  increment: 'premajor'
})
console.log(JSON.stringify(results, null, 2))
```
