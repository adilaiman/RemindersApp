# Reminders App

## TODO
- [x] ~~Reminder Object: Title, Description, Date/Time~~
- [x] ~~MongoDB: Users & Reminders Collections~~
- [x] ~~User Authentication & Login~~
- [x] ~~User editing: add, delete, edit~~
- [x] ~~Collection modifcation via secure Meteor methods~~
- [x] ~~Design layout: LESS, Bootstrap~~
- [ ] Unit Tests ❌
- [ ] Calendar integration (fullcalendar.io) ❌

Been smashing my head against a wall and on stackoverflow trying to complete the final two requirements. Unfortunately my attempts at implementation of it 🅱orked my app, so this is a "stable" version for now, hopefully I will be able to get a working app that meets all the requirements soon, watch for some commits as I fiddle around with the code hoping it works 🙃.

## Build
```
cd <PROJECT_FOLDER>
meteor npm install --save @fullcalendar/core @fullcalendar/daygrid
meteor npm install --save bootstrap
meteor add less
meteor
```

## How To
### Login & Register
![](gif/sign_in.gif)

### Create new reminder
![](gif/newrem.gif)

### Check & hide completed reminders
![](gif/hide.gif)

### Edit existing reminder
![](gif/edit_rem.gif)

### Delete existing reminder
![](gif/delete.gif)