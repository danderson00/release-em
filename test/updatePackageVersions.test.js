const update = require('../src/updatePackageVersions')

test("package dependencies are updated", () => {
  expect(
    update({
      name: 'test',
      dependencies: { a: '1', b: '2' },
      devDependencies: { a: '1', c: '3' },
      optionalDependencies: { a: '1', d: '4' },
      peerDependencies: { a: '1', e: '5' }
    }, { a: '2', c: '4', e: '6' })
  ).toEqual({
    name: 'test',
    dependencies: { a: '2', b: '2' },
    devDependencies: { a: '2', c: '4' },
    optionalDependencies: { a: '2', d: '4' },
    peerDependencies: { a: '2', e: '6' }
  })
})

test("version prefixes are preserved", () => {
  expect(
    update({
      name: 'test',
      dependencies: { a: '^0.0.1', b: '~0.1.0', c: '1.0.0' }
    }, { a: '0.0.2', b: '0.1.1', c: '2.0.0' })
  ).toEqual({
    name: 'test',
    dependencies: { a: '^0.0.2', b: '~0.1.1', c: '2.0.0' }
  })
})

test("order of properties in package.json is preserved", () => {
  expect(
    JSON.stringify(update({
      devDependencies: { a: '1', c: '3' },
      name: 'test',
      dependencies: { a: '1', b: '2' },
      version: 1
    }, { a: '2', c: '4', e: '6' }))
  ).toBe(`{"devDependencies":{"a":"2","c":"4"},"name":"test","dependencies":{"a":"2","b":"2"},"version":1}`)
})