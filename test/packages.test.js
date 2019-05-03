const { findPackages, matchingVersions } = require('../src/packages')
const { join } = require('path')

test("findPackages", () => {
  expect(findPackages(join(__dirname, 'packages'))).toMatchObject([
    { name: 'app', version: '0.0.1' },
    { name: 'app.core', version: '0.0.1' },
    { name: 'library', version: '1.0.0' }
  ])
})

test("single path", () => {
  const matches = matchingVersions(findPackages(join(__dirname, 'packages')), ['/app'])  
  expect(matches).toEqual({
    'app': '0.0.1',
    'app.core': '0.0.1'
  })
})

test("multiple paths", () => {
  const matches = matchingVersions(findPackages(join(__dirname, 'packages')), ['/app.', '/library'])  
  expect(matches).toEqual({
    'app.core': '0.0.1',
    'library': '1.0.0'
  })
})

test("files are ignored", () => {
  const matches = matchingVersions(findPackages(join(__dirname, 'packages')), ['/app.', 'index'])  
  expect(matches).toEqual({
    'app.core': '0.0.1'
  })
})