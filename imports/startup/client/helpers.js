import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Match } from 'meteor/check'

import Authority from 'meteor/chap:authority/imports/classes/Authority'

Template.registerHelper('userIs', function (roles) {
  if (!Match.test(roles, String)) return false
  return roles.split(Authority.separator).some(function (name) {
    return Authority.userIs(Meteor.userId(), name)
  })
})

Template.registerHelper('userCan', function (perms) {
  if (!Match.test(perms, String)) return false
  return perms.split(Authority.separator).some(function (name) {
    return Authority.userCan(Meteor.userId(), name)
  })
})
