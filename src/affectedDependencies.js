// this module is purely for verbose logging output

const versionPrefix = version => (version.match(/([~^])/) || [''])[0]

module.exports = (packageJson, updatedDependencies) => {
  const affectedDependencies = dependencyList => dependencyList && (
    Object.keys(dependencyList).reduce(
      (affected, packageName) => Object.keys(updatedDependencies).includes(packageName)
        ? { ...affected, [packageName]: { 
            from: dependencyList[packageName], 
            to: versionPrefix(dependencyList[packageName]) + updatedDependencies[packageName] 
          } }
        : affected,
      {}
    )
  )

  const optionalProperty = (name, value) => value && Object.keys(value).length > 0 && { [name]: value }
  
  return {
    ...optionalProperty('dependencies', affectedDependencies(packageJson.dependencies)),
    ...optionalProperty('devDependencies', affectedDependencies(packageJson.devDependencies)),
    ...optionalProperty('optionalDependencies', affectedDependencies(packageJson.optionalDependencies)),
    ...optionalProperty('peerDependencies', affectedDependencies(packageJson.peerDependencies))
  }
}