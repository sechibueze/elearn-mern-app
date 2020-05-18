const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // courses: [{
  //   courseId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Course'
  //   }
  // }],
  cart: [{
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    price: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      default: 'paid' //unpaid
    }
  }]
}, { timestamps: true });

module.exports = Profile = mongoose.model('Profile', ProfileSchema);