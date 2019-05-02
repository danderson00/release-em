const release = require('release-it')

require('release-it/lib/plugin/version/Version').isEnabled = () => false

release({})