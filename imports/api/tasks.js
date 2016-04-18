/**
 *
 * Created by zephyre on 4/17/16.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', () => Tasks.find({}));
}

Meteor.methods({
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(new Mongo.ObjectID(taskId), { $set: { checked: setChecked } });
  }
});


