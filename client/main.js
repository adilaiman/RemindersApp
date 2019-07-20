import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Reminders } from '../imports/api/reminders.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import './main.html';
import "../imports/startup/accounts-config.js";

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/@fullcalendar/core/main.css';
import '../node_modules/@fullcalendar/daygrid/main.css';

// get random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// load all reminders into calendar
function updateCalendar() {
  const { calendar } = Template.instance();
  const events = Reminders.find().fetch();
  console.table(events)

  for (let event of events) {
    const temp = { id: event._id, title: event.title, date: event.date, allDay:true, description: event.description, backgroundColor: event.color, borderColor: event.color }

    // check if the event already exists in the calender
    const eventInCalendar = calendar.getEventById(temp.id);
    if (eventInCalendar) {
      // update any properties.
      eventInCalendar.setProp('title', temp.title);
    } else {
      // add new event
      calendar.addEvent(temp);
    }
  }
}

// deleter reminder from calendar
function deleteEvent(eventID) {
  const { calendar } = Template.instance();
  const events = calendar.getEvents();
  let target;

  for (let event of events) {
    if (event.id == eventID) {
      target = event;
    }
  }
  target.remove();
}

Template.body.helpers({

  // return users reminders, hide completed reminders if hide completed is checked
  reminders() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      return Reminders.find(
        { completed: { $ne: true } },
        {sort: { date: 1 }}
      );
    } else {
      updateCalendar();
      return Reminders.find(
        {},
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

//global scoped helper function
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

    // place title, descrip & date elements into vars
    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const dateInput = document.querySelector("#date");
    // get values
    const tV = titleInput.value;
    const dV = descriptionInput.value;
    const dateValue = dateInput.value;
    const color = getRandomColor();


    if (/^$|\s+/.test(tV) || /^$|\s+/.test(dV) || /^$|\s+/.test(dateValue)) {
      alert("Please fill out all fields");
    } else {
    // call meteor method to insert data into collection
    Meteor.call("reminders.insert", tV, dV, dateValue, color);
    
    // clear form values
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value="";
    }
  },

  // cross out checked/completed event
  "click .toggle-checked"() {
    Meteor.call('reminders.setChecked', this._id, !this.completed);
  },

  // delete reminder
  "click .delete"() {
    // call meteor method to delete data from collection
    deleteEvent(this._id);
    Meteor.call("reminders.remove", this._id);

  },

  // hide completed reminders
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

  // edit post
  "click .edit"(e) {
    // get elements
    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");

    // call to update values
    Meteor.call("reminders.edit", this._id, titleInput.value, descriptionInput.value);

    // clear form values
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value="";
  }
  
});

// store initial state on generation of body
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('reminders');
});

// render calendar
Template.body.rendered = () => {
    const calendarEl = document.getElementById('calendar');    

    const calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ],
      events: [],
    });

    Template.instance().calendar = calendar;
    calendar.render();
}
