# RemindersApp

## Info
A simple reminders app created using MeteorJS.

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

## TODO
- [x] ~~Reminder Object: Title, Description, Date/Time~~
- [x] ~~MongoDB: Users & Reminders Collections~~
- [x] ~~User Authentication & Login~~
- [x] ~~User editing: add, delete, edit~~
- [x] ~~Collection modifcation via secure Meteor methods~~
- [x] ~~Design layout: LESS, Bootstrap~~
- [ ] **Unit Tests**
- [ ] **Calendar integration (fullcalendar.io)**