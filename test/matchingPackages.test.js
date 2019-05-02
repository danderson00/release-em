const match = require('../src/matchingPackages')
const { join } = require('path')

test("single path", () => {
  const matches = match(join(__dirname, 'packages'), ['/app'])  
  expect(matches.length).toBe(2)
  expect(matches[0].replace(/\\/g, '/').endsWith('/test/packages/app')).toBe(true)
  expect(matches[1].replace(/\\/g, '/').endsWith('/test/packages/app.core')).toBe(true)
})

test("multiple paths", () => {
  const matches = match(join(__dirname, 'packages'), ['/app.', '/library'])  
  expect(matches.length).toBe(2)
  expect(matches[0].replace(/\\/g, '/').endsWith('/test/packages/app.core')).toBe(true)
  expect(matches[1].replace(/\\/g, '/').endsWith('/test/packages/library')).toBe(true)
})

test("files are excluded", () => {
  const matches = match(join(__dirname, 'packages'), ['/app.', 'index'])  
  expect(matches.length).toBe(1)
  expect(matches[0].replace(/\\/g, '/').endsWith('/test/packages/app.core')).toBe(true)
})