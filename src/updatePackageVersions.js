module.exports = (packageJson, updatedDependencies) => {
  const updateDependencyList = dependencyList => Object.keys(dependencyList).reduce(
    (newDependencyList, packageName) => ({
      ...newDependencyList,
      [packageName]: updatedDependencies[packageName] || dependencyList[packageName]
    }),
    {}
  )

  return {
    ...packageJson,
    dependencies: updateDependencyList(packageJson.dependencies),
    devDependencies: updateDependencyList(packageJson.devDependencies),
    optionalDependencies: updateDependencyList(packageJson.optionalDependencies),
    peerDependencies: updateDependencyList(packageJson.peerDependencies)
  }
}