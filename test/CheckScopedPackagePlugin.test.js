const Check = require('../src/plugins/CheckScopedPackagePlugin')

test("if package is scoped and not private, publishConfig must be set", () => {
  expect(() => new Check().check({
    name: '@scope/test'
  })).toThrow('"publishConfig"')
})

test("if package is scoped and private, publishConfig need not be set", () => {
  expect(() => new Check().check({
    name: '@scope/test',
    private: true
  })).not.toThrow()
})

test("Check passes is publishConfig is set", () => {
  expect(() => new Check().check({
    name: '@scope/test',
    publishConfig: {
      access: 'public'
    }
  })).not.toThrow()
})