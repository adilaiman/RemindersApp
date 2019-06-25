import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import { check } from 'meteor/check';

export const Reminders = new Mongo.Collection("reminders");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('reminders', function reminderPublication() {
      return Reminders.find({ owner: this.userId });
    });
}

Meteor.methods({

    'reminders.insert'(title, description, date) {
      check(title, String);
      check(description, String);
      check(date, String);
  
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
  
      Reminders.insert({
        title: title,
        description: description,
        date: new Date(date),
        completed: false,
        owner: Meteor.userId(),
        username: Meteor.user().username,
      });
    },
  
    'reminders.remove'(reminderId) {
      check(reminderId, String);
      Reminders.remove(reminderId);
    },
  
    'reminders.setChecked'(reminderId, setCompleted) {
      check(reminderId, String);
      check(setCompleted, Boolean);
      Reminders.update(reminderId, { $set: { completed: setCompleted } });
    },
  
  });