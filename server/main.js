import 'meteor/chap:authority/imports/startup/server'

import Authority from 'meteor/chap:authority/imports/classes/Authority'
import Roles from 'meteor/chap:authority/imports/collections/Roles'
import Permissions from 'meteor/chap:authority/imports/collections/Permissions'

export { Authority as default, Roles, Permissions }
