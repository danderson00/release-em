const update = require('../src/updatePackageVersions')

test("package dependencies are updated", () => {
  expect(
    update({
      name: 'test',
      dependencies: { a: 1, b: 2 },
      devDependencies: { a: 1, c: 3 },
      optionalDependencies: { a: 1, d: 4 },
      peerDependencies: { a: 1, e: 5 }
    }, { a: 2, c: 4, e: 6 })
  ).toEqual({
    name: 'test',
    dependencies: { a: 2, b: 2 },
    devDependencies: { a: 2, c: 4 },
    optionalDependencies: { a: 2, d: 4 },
    peerDependencies: { a: 2, e: 6 }
  })
})