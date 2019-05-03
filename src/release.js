const release = require('release-it')

release({ 
  npm: false,
  increment: 'premajor', 
  preReleaseId: 'alpha', 
  'non-interactive': true, 
  'dry-run': true, 
  git: false,
  // git: { commit: false, tag: false, push: false, changelog: false, requireCleanWorkingDir: false },
  plugins: {
    './src/UpdateDependencyVersions': {
      "updatedDependencies": {
        'test.core': '0.0.2'
      }
    }
  }
})