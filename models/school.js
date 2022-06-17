const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "school's name must be provided"],
  },
  wikiPage: {
    type: String,
    required: [true, "school's wiki page must be provided"],
  },
  state: {
    type: String,
    required: [true, "the state where the school is located must be provided"],
  },
  abbreviation: {
    type: String,
    default: "No abbreviation"
  },
  location: {
    type: String,
    required: [true, "provide school's location"],
  },
  funding: {
    type: String,
    required: [true, "provide the entity in charge of funding this school"],
  },
  year_founded: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('School', schoolSchema);
