import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Match } from 'meteor/check'

import Authority from 'meteor/chap:authority/imports/classes/Authority'

Template.registerHelper('userIs', function (roles) {
  if (!Match.test(roles, String)) return false
  return Authority.userIs(Meteor.userId(), roles.split(Authority.separator))
})

Template.registerHelper('userCan', function (perms) {
  if (!Match.test(perms, String)) return false
  return Authority.userCan(Meteor.userId(), perms.split(Authority.separator))
})
