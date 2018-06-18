import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import Permissions from 'meteor/chap:authority/imports/collections/Permissions'
import Roles from 'meteor/chap:authority/imports/collections/Roles'
import Users from 'meteor/chap:authority/imports/collections/Users'

class Authority {
  static get separator () { return ',' }
  static userIs (userId, roles) {
    if (!Match.test(userId, String) || !Match.test(roles, [String])) return false
    const userRoles = Authority.getUserRoles(userId)
    let res = false
    roles.forEach(roleName => {
      if (!res && userRoles.indexOf(roleName) !== -1) res = true
    })
    return res
  }
  static userCan (userId, perms) {
    if (!Match.test(userId, String) || !Match.test(perms, [String])) return false
    const userPerms = Authority.getUserPermissions(userId)
    let res = false
    perms.forEach(permName => {
      if (!res && userPerms.indexOf(permName) !== -1) res = true
    })
    return res
  }
  static getRoleParents (roleName) {
    const parents = []
    if (!Match.test(roleName, String)) return parents
    while (roleName) {
      const role = Roles.findOne({name: roleName})
      if (role && role.parent) {
        roleName = role.parent
        parents.push(roleName)
      } else roleName = ''
    }
    return parents
  }
  static getUserRoles (userId) {
    const roles = []
    if (!Match.test(userId, String)) return roles
    const user = Users.findOne(userId)
    if (!user || !user.roles) return roles
    user.roles.forEach(roleName => {
      if (roles.indexOf(roleName) === -1) roles.push(roleName)
      Authority.getRoleParents(roleName).forEach(parentName => {
        if (roles.indexOf(parentName) === -1) roles.push(parentName)
      })
    })
    return roles
  }
  static getUserPermissions (userId) {
    const perms = []
    if (!Match.test(userId, String)) return perms
    Authority.getUserRoles(userId).forEach(roleName => {
      const role = Roles.findOne({name: roleName})
      if (role && role.permissions) {
        role.permissions.forEach(permName => {
          if (perms.indexOf(permName) === -1) perms.push(permName)
        })
      }
    })
    return perms
  }
}
if (Meteor.isServer) {
  Authority.saveRole = function (name, parent = '') {
    check(name, String)
    check(parent, String)
    if (name.length === 0) throw new Meteor.Error('Authority.saveRole', 'Name is empty')
    const role = Roles.findOne({name})
    parent = Roles.findOne({name: parent})
    if (role) {
      const modifier = {}
      if (parent) modifier.$set = {parent: parent.name}
      else modifier.$unset = {parent: ''}
      Roles.update(role._id, modifier)
    } else {
      const doc = {name, permissions: []}
      if (parent) doc.parent = parent.name
      Roles.insert(doc)
    }
  }
  Authority.deleteRole = function (name) {
    check(name, String)
    const users = Users.find({roles: name})
    if (users.count() > 0) throw new Meteor.Error('Authority.deleteRole', 'Role is in use')
    const children = Roles.find({parent: name})
    if (children.count() > 0) throw new Meteor.Error('Authority.deleteRole', 'Role has children')
    Roles.remove({name})
  }
  Authority.createPermission = function (name) {
    check(name, String)
    if (name.length === 0) throw new Meteor.Error('Authority.createPermission', 'Name is empty')
    const permission = Permissions.findOne({name})
    if (!permission) Permissions.insert({name})
  }
  Authority.deletePermission = function (name) {
    check(name, String)
    const roles = Roles.find({permissions: name})
    if (roles.count() > 0) throw new Meteor.Error('Authority.deletePermission', 'Permission is in use')
    Permissions.remove({name})
  }
  Authority.addUserToRole = function (userId, name) {
    check(userId, String)
    check(name, String)
    const user = Users.findOne(userId)
    const role = Roles.findOne({name})
    if (user && role) Users.update(user._id, {$addToSet: {roles: name}})
  }
  Authority.removeUserFromRole = function (userId, name) {
    check(userId, String)
    check(name, String)
    const user = Users.findOne(userId)
    const role = Roles.findOne({name})
    if (user && role) Users.update(user._id, {$pull: {roles: name}})
  }
  Authority.addPermissionToRole = function (pName, rName) {
    check(pName, String)
    check(rName, String)
    const perm = Permissions.findOne({name: pName})
    const role = Roles.findOne({name: rName})
    if (perm && role) Roles.update(role._id, {$addToSet: {permissions: pName}})
  }
  Authority.removePermissionFromRole = function (pName, rName) {
    check(pName, String)
    check(rName, String)
    const perm = Permissions.findOne({name: pName})
    const role = Roles.findOne({name: rName})
    if (perm && role) Roles.update(role._id, {$pull: {permissions: pName}})
  }
}

export default Authority
