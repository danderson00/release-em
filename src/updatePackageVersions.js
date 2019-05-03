module.exports = (packageJson, updatedDependencies) => {
  const versionPrefix = version => (version.match(/([~^])/) || [''])[0]

  const updateDependencyList = dependencyList => dependencyList && (
    Object.keys(dependencyList).reduce(
      (newDependencyList, packageName) => ({
        ...newDependencyList,
        [packageName]: updatedDependencies[packageName]
          ? (versionPrefix(dependencyList[packageName]) + updatedDependencies[packageName]) 
          : dependencyList[packageName]
      }),
      {}
    )
  )

  const updateProperty = name => packageJson[name] && { [name]: updateDependencyList(packageJson[name]) }

  return {
    ...packageJson,
    ...updateProperty('dependencies'),
    ...updateProperty('devDependencies'),
    ...updateProperty('optionalDependencies'),
    ...updateProperty('peerDependencies')
  }
}