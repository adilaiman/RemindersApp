import { Template } from 'meteor/templating';
import { Reminders } from '../imports/api/reminders.js';

import './main.html';

Template.body.helpers({
  reminders() {
    return Reminders.find({});
  },
});