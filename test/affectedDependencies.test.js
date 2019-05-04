const affected = require('../src/affectedDependencies')

test("affected dependencies are calculated from package JSON", () => {
  expect(affected({
    dependencies: { a: '^0.0.1', b: '^0.1.0', c: '~1.0.0' },
    devDependencies: { d: '2.0.0', e: '3.0.0' },
    optionalDependencies: { f: '11.1.2' }
  }, { a: '0.0.2', c: '1.0.1', e: '4.0.0' })).toEqual({
    dependencies: {
      a: { from: '^0.0.1', to: '^0.0.2' },
      c: { from: '~1.0.0', to: '~1.0.1' }
    },
    devDependencies: {
      e: { from: '3.0.0', to: '4.0.0' }
    }
  })
})