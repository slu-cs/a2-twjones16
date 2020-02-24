const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // caonnect to the database

queries = [
  //find where the zip = canton zip
  Voter.find().where('zip').equals('13617'),
  //find voters with first name STARR
  Voter.find().where('first').equals('STARR'),
  //who voted in 2016 general election
  Voter.find({'history':{$regex: '.*GE16.*'}}),
  // find the last last name
  Voter.find().sort('-last').limit(1),
  //find all the distinct zips
  Voter.distinct('zip')
];

Promise.all(queries)
  .then(function(r) {
    console.log('Number of registeredd voters in Canton zipcode ', r[0].length);
    console.log('Full names of people with the first name STARR ', r[1].map(x => x.first + ' ' + x.last));
    console.log('Number of voters in the 2016 general election ', r[2].length);
    console.log('Last name in the county in alphbetical order ', r[3].map(x => x.last));
    console.log('How many zipcodes in the county ', r[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
