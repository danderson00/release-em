const inc = require('../src/incrementVersions')

test("versions are incremented according to specified increment", () => {
  expect(inc({
    a: '0.0.1',
    b: '0.1.0',
    c: '1.0.0'
  }, 'minor')).toEqual({
    a: '0.1.0',
    b: '0.2.0',
    c: '1.1.0'
  })
})

test("prerelease ID is applied", () => {
  expect(inc({
    a: '0.1.1'
  }, 'premajor', 'alpha')).toEqual({
    a: '1.0.0-alpha.0'
  })
})