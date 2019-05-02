const bump = require('../src/bumpPackageVersion')

test("patch", () => 
  expect(bump({ version: '0.0.1' }, 'patch'))
    .toEqual({ version: '0.0.2'})
)

test("minor", () => 
  expect(bump({ version: '0.0.1' }, 'minor'))
    .toEqual({ version: '0.1.0'})
)

test("major", () => 
  expect(bump({ version: '0.0.1' }, 'major'))
    .toEqual({ version: '1.0.0'})
)

test("patch is default", () => 
  expect(bump({ version: '0.0.1' }))
    .toEqual({ version: '0.0.2'})
)

test("other properties are preserved", () =>
  expect(bump({ name: 'test', version: '0.0.1' }))
  .toEqual({ name: 'test', version: '0.0.2'})
)

test("handles additional build numbers", () =>
  expect(bump({ name: 'test', version: '0.0.1.12' }))
    .toEqual({ name: 'test', version: '0.0.2.0'})
)