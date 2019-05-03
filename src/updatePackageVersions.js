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

  return {
    ...packageJson,
    ...(packageJson.dependencies && { dependencies: updateDependencyList(packageJson.dependencies) }),
    ...(packageJson.devDependencies && { devDependencies: updateDependencyList(packageJson.devDependencies) }),
    ...(packageJson.optionalDependencies && { optionalDependencies: updateDependencyList(packageJson.optionalDependencies) }),
    ...(packageJson.peerDependencies && { peerDependencies: updateDependencyList(packageJson.peerDependencies) })
  }
}