const { findPackages, releaseVersions } = require('../src/packages')
const { join } = require('path')

test("findPackages for a single path", () => {
  expect(findPackages(join(__dirname, 'packages'), ['app*'])).toMatchObject([
    { name: 'app', version: '0.0.1', release: true },
    { name: 'app.core', version: '0.0.1', release: true },
    { name: 'library', version: '1.0.0', release: false }
  ])
})

test("findPackages for a multiple paths", () => {
  expect(findPackages(join(__dirname, 'packages'), ['app.*', 'library'])).toMatchObject([
    { name: 'app', version: '0.0.1', release: false },
    { name: 'app.core', version: '0.0.1', release: true },
    { name: 'library', version: '1.0.0', release: true }
  ])
})

test("matching versions for single path", () => {
  const matches = releaseVersions(findPackages(join(__dirname, 'packages'), ['app*']))  
  expect(matches).toEqual({
    'app': '0.0.1',
    'app.core': '0.0.1'
  })
})

test("matching versions for multiple paths", () => {
  const matches = releaseVersions(findPackages(join(__dirname, 'packages'), ['app.*', 'library']))
  expect(matches).toEqual({
    'app.core': '0.0.1',
    'library': '1.0.0'
  })
})
