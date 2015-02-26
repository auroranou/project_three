# Read n Ride

Have something interesting to peruse during your commute! If you live in the DC area, enter your Metro stations and let Read n Ride fetch you long-form journalism stories to read.

This app is my final project for General Assembly's Web Development Immersive. It uses the Washington Metropolitan Area Transit Authority's (WMATA) API and a [Longreads API](https://github.com/auroranou/node_longreads) that I built using node.js.

## User stories

+ Users can select their WMATA origin station
+ Users can select their WMATA destination station
+ Users can view their estimated commute time
+ Users can view Longreads articles that match their predicted travel time

## Technologies used

+ Meteor.js

## Package notes:
For API requests:
```
meteor add http
```
For security etc.:
```
meteor remove insecure
meteor remove autopublish
```
