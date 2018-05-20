import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'

import 'meteor/chap:authority/imports/startup/client'

import Authority from 'meteor/chap:authority/imports/classes/Authority'

export default Authority

Tracker.autorun(function () {
  Authority.sub = Meteor.subscribe('authority')
})
