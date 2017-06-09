# Read n Ride

Have something interesting to peruse during your commute! If you live in the DC area, enter your Metro stations and let Read n Ride fetch you long-form journalism stories to read.

This app is my final project for General Assembly's Web Development Immersive. It uses the Washington Metropolitan Area Transit Authority's (WMATA) API and a [Longreads API](https://github.com/auroranou/node_longreads) that I built using node.js.

## User stories:

+ Users can select their WMATA origin and destination station
+ Users can view their estimated commute time
+ Users can view Longreads articles that match their predicted travel time
+ Users can sign up for an account
+ Users can log in
+ Users who are signed in can save articles to a personal list

## Models and relationships:

+ Stations: a Mongo collection of all WMATA stations
+ Users: generated using Meteor's ```accounts-password``` package
+ Lists: arrays of articles owned by app users

## Technologies used:

+ Meteor.js

## Local development:
```
// install meteor then cd into directory
meteor npm install
meteor run
// runs at localhost:3000
```

## Package notes:

For API requests:
```
meteor add http
```

For routing:
```
meteor add iron:router
```

For security etc.:
```
meteor remove insecure
meteor remove autopublish
```

## Future additions?

+ User accounts and authentication with Twitter/Google/Facebook
+ Ability for users to share articles
+ Support for non-Metro public transit (i.e. bus commutes)
