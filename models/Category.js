const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: Object,
    default: {},
    required: true
  }
}, { timestamps: true });

module.exports = Category = mongoose.model('category', CategorySchema);