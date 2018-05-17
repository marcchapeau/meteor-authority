Package.describe({
  name: 'chap:authority',
  version: '0.0.1',
  summary: 'Roles and permissions package for Meteor',
  git: 'https://github.com/marcchapeau/meteor-authority.git',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6.1.1')
  api.use('ecmascript')
  api.mainModule('authority.js')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('authority')
  api.mainModule('authority-tests.js')
})
