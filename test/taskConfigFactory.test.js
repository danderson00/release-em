const factory = require('../src/taskConfigFactory')
const { resolve } = require('path')

const updatedDependencies = { a: '0.0.1' }
const plugins = { [`${resolve(__dirname, '../src')}/UpdateDependencyVersions`]: { updatedDependencies } }

test("default release config", () => {
  expect(factory({}, updatedDependencies)({ path: 'path', release: true }))
    .toEqual({
      path: 'path',
      config: { 
        plugins,
        'non-interactive': true,
        'dry-run': undefined,
        increment: undefined,
        preReleaseId: undefined
      }
  })
})

test("default non-release config", () => {
  expect(factory({}, updatedDependencies)({ path: 'path', release: false }))
    .toEqual({
      path: 'path',
      config: { 
        plugins,
        'non-interactive': true,
        'dry-run': undefined,
        npm: false,
        git: false
      }
    })
})

test("adding release config", () => {
  const releaseConfig = { option: 'value' }

  expect(factory({ releaseConfig }, updatedDependencies)({ release: true }))
    .toMatchObject({ config: releaseConfig })
})

test("adding non-release config", () => {
  const nonReleaseConfig = { option: 'value' }

  expect(factory({ nonReleaseConfig }, updatedDependencies)({ release: false }))
    .toMatchObject({ config: nonReleaseConfig })
})

test("adding common config", () => {
  const commonConfig = { option: 'value' }

  expect(factory({ commonConfig }, updatedDependencies)({ release: true }))
    .toMatchObject({ config: commonConfig })

  expect(factory({ commonConfig }, updatedDependencies)({ release: false }))
    .toMatchObject({ config: commonConfig })
})