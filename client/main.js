import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'

import 'meteor/chap:authority/imports/startup/client'

import Authority from 'meteor/chap:authority/imports/classes/Authority'
import Roles from 'meteor/chap:authority/imports/collections/Roles'
import Permissions from 'meteor/chap:authority/imports/collections/Permissions'

Tracker.autorun(function () {
  Authority.sub = Meteor.subscribe('authority')
})

export { Authority as default, Roles, Permissions }
