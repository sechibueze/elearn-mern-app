const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  courseImage: {
    type: Object,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  price: {
    type: String,
    required: true,
    default: 'free'
  },
  published: {
    type: Boolean,
    default: false
  },
  lessons: [{
    type: {
      type: String,
      require: true,
      default: 'video'
    },
    access: {
      type: String,
      required: true,
      default: 'public'
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true,
    },
    note: {
      type: String
    }
  }],
  subscriptions: [{
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, { timestamps: true});

module.exports = Course = mongoose.model('course', CourseSchema);