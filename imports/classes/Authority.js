import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import Permissions from 'meteor/chap:authority/imports/collections/Permissions'
import Roles from 'meteor/chap:authority/imports/collections/Roles'
import Users from 'meteor/chap:authority/imports/collections/Users'

const Authority = {
  sub: {},
  userIs (userId, roleName) {
    check(userId, String)
    check(roleName, String)
    const user = Users.findOne({_id: userId, roles: roleName})
    return !!user
  },
  userCan (userId, permName) {
    check(userId, String)
    check(permName, String)
    const roles = Roles.find({permissions: permName}).map(r => r.name)
    const user = Users.findOne({_id: userId, roles: {$in: roles}})
    return !!user
  }
}

if (Meteor.isServer) {
  Authority.createRole = function (name) {
    check(name, String)
    if (name.length === 0) {
      throw new Meteor.Error('Authority.createRole', 'Name is empty')
    }
    const role = Roles.findOne({name})
    if (role) return false
    return Roles.insert({name, permissions: []})
  }
  Authority.deleteRole = function (name) {
    check(name, String)
    const count = Users.find({roles: name}).count()
    if (count > 0) {
      throw new Meteor.Error('Authority.deleteRole', 'Role is in use')
    }
    Roles.remove({name})
  }
  Authority.createPermission = function (name) {
    check(name, String)
    if (name.length === 0) {
      throw new Meteor.Error('Authority.createPermission', 'Name is empty')
    }
    const permission = Permissions.findOne({name})
    if (permission) return false
    return Permissions.insert({name})
  }
  Authority.deletePermission = function (name) {
    check(name, String)
    const count = Roles.find({permissions: name}).count()
    if (count > 0) {
      throw new Meteor.Error('Authority.deletePermission', 'Permission is in use')
    }
    Permissions.remove({name})
  }
  Authority.addUserToRole = function (userId, roleName) {
    check(userId, String)
    check(roleName, String)
    const user = Users.findOne(userId)
    const role = Roles.findOne({name: roleName})
    if (user && role) {
      Users.update(user._id, {$addToSet: {roles: roleName}})
    }
  }
  Authority.removeUserFromRole = function (userId, roleName) {
    check(userId, String)
    check(roleName, String)
    const user = Users.findOne(userId)
    const role = Roles.findOne({name: roleName})
    if (user && role) {
      Users.update(user._id, {$pull: {roles: roleName}})
    }
  }
  Authority.addPermissionToRole = function (permName, roleName) {
    check(permName, String)
    check(roleName, String)
    const perm = Permissions.findOne({name: permName})
    const role = Roles.findOne({name: roleName})
    if (perm && role) {
      Roles.update(role._id, {$addToSet: {permissions: permName}})
    }
  }
  Authority.removePermissionFromRole = function (permName, roleName) {
    check(permName, String)
    check(roleName, String)
    const perm = Permissions.findOne({name: permName})
    const role = Roles.findOne({name: roleName})
    if (perm && role) {
      Roles.update(role._id, {$pull: {permissions: permName}})
    }
  }
}

export default Authority