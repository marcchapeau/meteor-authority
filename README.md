# Authority

Roles and permissions package for Meteor

## Usage

Add package:

    meteor add chap:authority

Use it:

```js
Authority.saveRole('webmaster')
Authority.createPermission('users.create')
Authority.addPermissionToRole('users.create', 'webmaster')
Authority.addUserToRole(someUserId, 'webmaster')
Authority.userIs(someUserId, ['admin'])// return false
Authority.userIs(someUserId, ['webmaster'])// return true
Authority.userCan(someUserId, ['users.create'])// return true
Authority.userCan(someUserId, ['users.delete'])// return false
```

## API

### Authority.saveRole(roleName, [parentName])

Create or update a role (server only).

```js
Authority.saveRole('webmaster')
```

### Authority.deleteRole(roleName)

Delete a role (server only).

```js
Authority.deleteRole('webmaster')
```

### Authority.createPermission(permName)

Create a new permission (server only).

```js
Authority.createPermission('users.create')
```

### Authority.deletePermission(permName)

Delete a permission (server only).

```js
Authority.deletePermission('users.create')
```

### Authority.addUserToRole(userId, roleName)

Add user to a role (server only).

```js
Authority.addUserToRole(someUserId, 'webmaster')
```

### Authority.removeUserFromRole(userId, roleName)

Remove user from a role (server only).

```js
Authority.removeUserFromRole(someUserId, 'webmaster')
```

### Authority.addPermissionToRole(permName, roleName)

Add permission to a role (server only).

```js
Authority.addPermissionToRole('users.create', 'webmaster')
```

### Authority.removePermissionFromRole(permName, roleName)

Remove permission from a role (server only).

```js
Authority.removePermissionFromRole('users.create', 'webmaster')
```

### Authority.getUserRoles(userId)

Get roles for a user.

```js
Authority.getUserRoles(someUserId)
```

### Authority.getUserPermissions(userId)

Get permissions for a user.

```js
Authority.getUserPermissions(someUserId)
```

### Authority.userIs(userId, roles)

Test if a user has a role.

```js
Authority.userIs(Meteor.userId(), ['webmaster'])
```

### Authority.userCan(userId, permissions)

Test if a user has permission to do something.

```js
Authority.userCan(Meteor.userId(), ['users.create'])
```

## Helpers

### userIs

```handlebars
{{userIs "webmaster"}}

{{#if userIs "webmaster,admin"}
  <!-- ... -->
{{/if}}
```

### userCan

```handlebars
{{userCan "users.create"}}

{{#if userCan "users.create,users.update,users.delete"}
  <!-- ... -->
{{/if}}
```