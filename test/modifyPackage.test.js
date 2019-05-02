const modify = require('../src/modifyPackage')
const uuid = require('uuid').v4
const { readFileSync } = require('fs')
const { join } = require('path')

const readTestPackage = () => JSON.parse(readFileSync(join(__dirname, 'package.json')))

test("package.json for path is modified accordingly", () => {
  const name = uuid()
  const oldPackage = readTestPackage()
  modify(__dirname, packageJson => ({ ...packageJson, name }))
  expect(readTestPackage()).toEqual({ ...oldPackage, name })
})