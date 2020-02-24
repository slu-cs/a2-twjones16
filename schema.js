// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of professors
const Voter = new mongoose.Schema({
  first: String,
  last: String,
  zip: Number,
  history: String
});

// Speed up queries on all fields
Professor.index({first: 1});
Professor.index({last: 1});
Professor.index({zip: 1});
Professor.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voters', Voter);
