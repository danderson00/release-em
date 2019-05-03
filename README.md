# Release 'em!

CLI release tool for multiple packages, built on [`release-it`](https://github.com/release-it/release-it).

**Release 'em!** automates the tedious tasks of software releases. It does all 
of the great things that [`release-it`](https://github.com/release-it/release-it) 
does, like bump versions, tag source repos, changelogs, etc., and also 
coordinates this across multiple packages. 

It works especially well when used in conjunction with 
[yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).
It also works equally well with both mono- and multi-repo configurations.

## Installation

It is recommended that **Release 'em!** is either installed globally or used
programmatically (see below).

```bash
yarn add --global release-em
```

## Usage

```bash
release-em <pathToRelease> [pathToRelease] [...] [options]
```

Multiple paths can be specified. '*' can be used as a wildcard in paths. Options are as follows.

||||
-|-|-
-d|--dry-run|Do not touch or write anything, but show the commands
-h|--help|Print these options
-i|--increment|Increment "major", "minor", "patch", or "pre*" version; or specify version [default: "patch"]
-I|--interactive|Prompt each change
-t|--target-path|Specify the path of the workspace to release
-v|--version|Print version number
-V|--verbose|Verbose output

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

**Release 'em!** uses the default [`release-it`](https://github.com/release-it/release-it)
configuration for packages being released (bump version, publish, tag, changelog), 
as well as updating local dependency versions for packages in the workspace not 
being released.

Additional configuration can be passed to 