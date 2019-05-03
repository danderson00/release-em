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
    [{ release: true }],
    [{ release: true }],
    [{ release: false }]
  ])
})