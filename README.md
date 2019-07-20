# Reminders App

## TODO
- [x] ~~Reminder Object: Title, Description, Date/Time~~
- [x] ~~MongoDB: Users & Reminders Collections~~
- [x] ~~User Authentication & Login~~
- [x] ~~User editing: add, delete, edit~~
- [x] ~~Collection modifcation via secure Meteor methods~~
- [x] ~~Design layout: LESS, Bootstrap~~
- [x] ~~Calendar integration (fullcalendar.io)~~
- [x] ~~Unit Tests~~

## Build
```
cd <PROJECT_FOLDER>
meteor npm install --save @fullcalendar/core @fullcalendar/daygrid
meteor npm install --save bootstrap
meteor add less
meteor
```

## Running Tests
```
meteor add meteortesting:mocha
meteor npm install --save-dev chai
meteor add practicalmeteor:chai

<BASH>
TEST_WATCH=1 meteor test --driver-package meteortesting:mocha

<WINDOWS>
setx TEST_WATCH 1
meteor test --driver-package meteortesting:mocha
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
