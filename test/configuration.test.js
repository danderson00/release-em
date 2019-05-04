const loadConfig = require('../src/configuration')

test("configuration is loaded from manifest and default configuration file", () => {
  const runtimeConfig = { targetPath: __dirname + '/configuration', releasePaths: ['app'] }
  expect(loadConfig(runtimeConfig)).toEqual({
    ...runtimeConfig,
    "increment": "patch",
    "manifest": { "option": "value" },
    "file": { "option": "value" },
    "common": "2"
  })
})

test("custom config path can be specified", () => {
  const runtimeConfig = { targetPath: __dirname + '/configuration', configPath: 'custom', releasePaths: ['app'] }
  expect(loadConfig(runtimeConfig)).toEqual({
    ...runtimeConfig,
    "increment": "patch",
    "manifest": { "option": "value" },
    "custom": { "option": "value" },
    "common": "3"
  })
})