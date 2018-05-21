Package.describe({
  name: 'chap:authority',
  version: '1.0.1',
  summary: 'Roles and permissions package for Meteor',
  git: 'https://github.com/marcchapeau/meteor-authority.git',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6.1.1')
  api.use('accounts-base')
  api.use('check')
  api.use('ecmascript')
  api.use('meteor')
  api.use('mongo')
  api.use('templating@1.3.2')
  api.use('tracker')
  api.mainModule('server/main.js', 'server')
  api.mainModule('client/main.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('chap:authority')
  api.mainModule('authority-tests.js')
})
