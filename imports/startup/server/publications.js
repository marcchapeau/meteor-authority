import { Meteor } from 'meteor/meteor'

import Users from 'meteor/chap:authority/imports/collections/Users'
import Roles from 'meteor/chap:authority/imports/collections/Roles'
import Authority from 'meteor/chap:authority/imports/classes/Authority'

Meteor.publish('authority', function () {
  if (!this.userId) return this.ready()
  const user = Users.findOne(this.userId, {fields: {roles: 1}})
  const roles = user ? Authority.getUserRoles(user._id) : []
  return [
    Users.find(user._id, {fields: {roles: 1}}),
    Roles.find({name: {$in: roles}}, {fields: {name: 1, parent: 1, permissions: 1}})
  ]
})
