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

    'reminders.insert'(title, description, date, color) {
      check(title, String);
      check(description, String);
      check(date, String);
      check(color, String)
  
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
        color: color,
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

    "reminders.edit"(reminderId, title, description) {
      check(reminderId, String);
      check(title, String);
      check(description, String);
      Reminders.update(reminderId, {$set: {title: title, description: description}});
    }
  
  });