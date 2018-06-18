import { Meteor } from 'meteor/meteor'

import Users from 'meteor/chap:authority/imports/collections/Users'
import Roles from 'meteor/chap:authority/imports/collections/Roles'

Meteor.publish('authority', function () {
  if (!this.userId) return this.ready()
  const user = Users.findOne(this.userId, {fields: {roles: 1}})
  return [
    Users.find({_id: user._id}, {fields: {roles: 1}}),
    Roles.find({name: {$in: user.roles}}, {fields: {name: 1, permissions: 1}})
  ]
})
