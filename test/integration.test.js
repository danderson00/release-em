const release = require('..')
const { mkdirSync, readFileSync, writeFileSync } = require('fs')
const rimraf = require('rimraf')

afterEach(() => rimraf.sync(`${__dirname}/integration`))

test("integration test", async () => {
  createPackages({
    a: {
      "version": "0.1.0",
      "dependencies": { "d": "1.0.1" },
      "devDependencies": { "b": "^0.0.2" },
      "peerDependencies": { "b": "~0.0.2" }
    },
    b: {
      "version": "0.0.2",
      "dependencies": {
        "c": "0.0.1",
        "d": "1.0.1"
      }
    },
    c: {
      "version": "0.0.1",
      "dependencies": { "d": "1.0.1" }
    },
    d: {
      "version": "1.0.1"
    }        
  })
  await release({
    targetPath: __dirname + '/integration',
    releasePaths: ['b', 'c'],
    increment: 'patch',
    releaseConfig: { npm: { publish: false }, git: false }
  })
  verifyPackages({
    a: {
      "version": "0.1.0",
      "dependencies": { "d": "1.0.1" },
      "devDependencies": { "b": "^0.0.3" },
      "peerDependencies": { "b": "~0.0.3" }
    },
    b: {
      "version": "0.0.3",
      "dependencies": {
        "c": "0.0.2",
        "d": "1.0.1"
      }
    },
    c: {
      "version": "0.0.2",
      "dependencies": { "d": "1.0.1" }
    },
    d: {
      "version": "1.0.1"
    }        
  })
  await release({
    targetPath: __dirname + '/integration',
    releasePaths: ['d'],
    increment: 'premajor',
    preReleaseId: 'alpha',
    releaseConfig: { npm: { publish: false }, git: false }
  })
  verifyPackages({
    a: {
      "version": "0.1.0",
      "dependencies": { "d": "2.0.0-alpha.0" },
      "devDependencies": { "b": "^0.0.3" },
      "peerDependencies": { "b": "~0.0.3" }
    },
    b: {
      "version": "0.0.3",
      "dependencies": {
        "c": "0.0.2",
        "d": "2.0.0-alpha.0"
      }
    },
    c: {
      "version": "0.0.2",
      "dependencies": { "d": "2.0.0-alpha.0" }
    },
    d: {
      "version": "2.0.0-alpha.0"
    }        
  })
})

const createPackages = packages => {
  rimraf.sync(`${__dirname}/integration`)
  mkdirSync(`${__dirname}/integration`)
  Object.keys(packages).forEach(name => {
    mkdirSync(`${__dirname}/integration/${name}`)
    writeFileSync(
      `${__dirname}/integration/${name}/package.json`,
      JSON.stringify({ name, ...packages[name] }, null, 2)
    )
  })
}

const verifyPackages = packages => {
  Object.keys(packages).forEach(name => {
    const packageJson = JSON.parse(readFileSync(`${__dirname}/integration/${name}/package.json`))
    expect(packageJson).toEqual({ name, ...packages[name] })
  })
}