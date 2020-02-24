
const fs = require('fs');
const readline = require('readline');

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

//start an empty list to store data parsed from csv
data = []

//set up the file to be read
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')

});


// read the file line by line and split on the commas
file.on('line', function(line) {
    const col = line.split(',');
    data.push(new Voter({
        first: col[0],
        last: col[1],
        zip: col[2],
        history: col[3]
        })
    );
});

//take the voters data just parsed from the file and promise then save them
file.on('close', function() {
    mongoose.connection.dropDatabase()
        .then(() => Promise.all(data.map(voter => voter.save())))
        .then(() => mongoose.connection.close())
        .then(() => console.log('Database is ready.'))
        .catch(error => console.error(error.stack));
});
