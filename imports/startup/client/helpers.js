import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Match } from 'meteor/check'

import Authority from 'meteor/chap:authority/imports/classes/Authority'

Template.registerHelper('userIs', function (roleNames) {
  if (!Match.test(roleNames, String)) return false
  return roleNames.split(Authority.separator).some(function (name) {
    return Authority.userIs(Meteor.userId(), name)
  })
})

Template.registerHelper('userCan', function (permNames) {
  if (!Match.test(permNames, String)) return false
  return permNames.split(Authority.separator).some(function (name) {
    return Authority.userCan(Meteor.userId(), name)
  })
})
