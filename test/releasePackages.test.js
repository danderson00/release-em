const releasePackages = require('../src/releasePackages')

test("release is called for each package found", async () => {
  const release = jest.fn()
  await releasePackages(release, { 
    targetPath: __dirname + '/packages',
    releasePaths: ['app*'], 
    releaseConfig: { release: true }, 
    nonReleaseConfig: { release: false } 
  })
  expect(release.mock.calls).toMatchObject([
    [{ release: true }, undefined],
    [{ release: true }, undefined],
    [{ release: false }, undefined]
  ])
})

test("results of each release are returned", async () => {
  const release = jest.fn(config => config.release)
  const results = await releasePackages(release, { 
    targetPath: __dirname + '/packages',
    releasePaths: ['app*'], 
    releaseConfig: { release: true }, 
    nonReleaseConfig: { release: false } 
  })
  expect(results).toEqual([true, true, false])
})

test("validation run is executed first if validate option is set", async () => {
  const release = jest.fn()
  await releasePackages(release, { 
    targetPath: __dirname + '/packages',
    releasePaths: ['app*'], 
    releaseConfig: { release: true }, 
    nonReleaseConfig: { release: false },
    validate: true
  })
  expect(release.mock.calls).toMatchObject([
    [{ release: true }, {}],
    [{ release: true }, {}],
    [{ release: false }, {}],
    [{ release: true }, undefined],
    [{ release: true }, undefined],
    [{ release: false }, undefined]
  ])
})