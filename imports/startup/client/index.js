import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import Authority from 'meteor/chap:authority/imports/classes/Authority'

Template.registerHelper('userIs', function (role) {
  return Authority.userIs(Meteor.userId(), role)
})

Template.registerHelper('userCan', function (perm) {
  return Authority.userCan(Meteor.userId(), perm)
})
