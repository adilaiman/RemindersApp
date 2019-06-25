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
      return Reminders.find(
        {$and: [{ completed: { $ne: true } }, {owner: Meteor.userId()}]},
        // {sort: { date: -1 }}
        {sort: { date: 1 }}
      );
    } else {
      return Reminders.find(
        {owner: Meteor.userId()},
        // {sort: { date: -1 }}
        {sort: { date: 1 }}
      );
    }
  },

  // return number of events that completed is false
  incompleteCount() {
    // return Reminders.find({ completed: { $ne: true }  }).count();
    return Reminders.find({$and: [{ completed: { $ne: true } }, {owner: Meteor.userId()}]}).count();
  },

});

//global scoped helpder function
Template.registerHelper("formatDate", (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (`${day}-${month}-${year}`);
});

Template.body.events({

  "submit .new-reminder" (e) {
    // don't do default action
    e.preventDefault();

    // place title and descrip elements into vars
    const timeInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const dateInput = document.querySelector("#date")
    // get values from t,d
    const tV = timeInput.value;
    const dV = descriptionInput.value;
    const dateValue = dateInput.value;

    // call meteor method to insert data into collection
    Meteor.call("reminders.insert", tV, dV, dateValue)
    
    // clear form values
    timeInput.value = "";
    descriptionInput.value = "";
    dateInput.value="";
  },

  // cross out checked/completed event
  "click .toggle-checked"() {
    Meteor.call('reminders.setChecked', this._id, !this.completed);
  },

  // delete reminder
  "click .delete"() {
    // call meteor method to delete data from collection
    Meteor.call("reminders.remove", this._id);
  },

  // hide completed reminders
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

  // edit post
  "click .edit"(e) {
    
  },

});

// store initial state on generation of body
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});