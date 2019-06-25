import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Reminders } from '../imports/api/reminders.js';


import './main.html';
import "../imports/startup/accounts-config.js";

Template.body.helpers({

  // return users reminders, hide completed reminders if hide completed is checked
  reminders() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      // return Reminders.find(
      //   { completed: { $ne: true } }, 
      //   { sort: { date: -1 } }
      // );
      return Reminders.find(
        {$and: [{ completed: { $ne: true } }, {owner: Meteor.userId()}]},
        {sort: { date: -1 }}
      );
    } else {
      // return Reminders.find(
      //   {},
      //   { sort: { date: -1 } }
      // );
      return Reminders.find(
        {owner: Meteor.userId()},
        {sort: { date: -1 }}
      );
    }
  },

  // return number of events that completed is false
  incompleteCount() {
    // return Reminders.find({ completed: { $ne: true }  }).count();
    return Reminders.find({$and: [{ completed: { $ne: true } }, {owner: Meteor.userId()}]}).count();
  },

});

Template.body.events({

  "submit .new-reminder" (e) {
    // don't do default action
    e.preventDefault();

    // place title and descrip elements into vars
    const t = document.querySelector("#title");
    const d = document.querySelector("#description");
    // get values from t,d
    const tV = t.value;
    const dV = d.value;

    // insert data into collection
    Reminders.insert({
      title: tV,
      description: dV,
      date: new Date(),
      completed: false,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // clear form values
    t.value = "";
    d.value = "";
  },

  // cross out checked/completed event
  "click .toggle-checked"() {
    Reminders.update(this._id, {$set: {completed: !this.completed}});
  },

  // delete reminder
  "click .delete"() {
    Reminders.remove(this._id);
  },

  // hide completed reminders
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

});

// store initial state on generation of body
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});