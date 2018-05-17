// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by authority.js.
import { name as packageName } from "meteor/authority";

// Write your tests here!
// Here is an example.
Tinytest.add('authority - example', function (test) {
  test.equal(packageName, "authority");
});
