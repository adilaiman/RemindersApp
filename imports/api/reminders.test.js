import { Meteor } from "meteor/meteor";
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Reminders } from './reminders.js';

if (Meteor.isServer) {

    describe('Reminders', function() {
        describe('methods', function() {

            // create a reminder
            const userId = Random.id();
            let reminderId;
            beforeEach(function () {
                Reminders.remove({});
                reminderId = Reminders.insert({
                  title: 'test title',
                  description: "test description",
                  date: new Date(),
                  owner: userId,
                  completed: 0,
                  username: 'jimbob',
                });
              });

            // check if you can delete reminder
            it('can delete owned reminder', function(){
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deleteReminders = Meteor.server.method_handlers['reminders.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteReminders.apply(invocation, [reminderId]);

                // Verify that the method does what we expected
                assert.equal(Reminders.find().count(), 0);
            });

            // check if you can edit the reminder
            it("can edit owned reminder", function(){
                const someTitle = "foobar"
                const someDescription = "foobar2"
                const editReminders = Meteor.server.method_handlers["reminders.edit"];

                editReminders(reminderId, someTitle, someDescription);

                assert.equal(Reminders.find({title: someTitle, description: someDescription}).count(), 1);

            });

            it("can set reminder to completed", function(){
                const option = true;
                const setChecked = Meteor.server.method_handlers["reminders.setChecked"];

                setChecked(reminderId, option);

                assert.equal(Reminders.find({completed: true}).count(), 1);

            });
        });
    });

}