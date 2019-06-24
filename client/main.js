import { Template } from 'meteor/templating';
import { Reminders } from '../imports/api/reminders.js';

import './main.html';

Template.body.helpers({

  reminders() {
    return Reminders.find(
      {},
      { sort: { date: -1 } }
      );
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
      date: new Date()
    });

    // clear form values
    t.value = "";
    d.value = "";
  },

});