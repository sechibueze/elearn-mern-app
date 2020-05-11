const { validationResult } = require('express-validator');
const Course = require('../models/Course');

const createCourse = (req, res) => {
  userId = '5eb6b3efd8d31402102895e9';
  const errorContainer = validationResult(req);
  if (!errorContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const {
    title,
    description,
    categoryId,
    price
    // published - you cannot publishe a course without lesson

  } = req.body;

  let courseInit = { userId, title, description, categoryId};
  if (price) courseInit.price = price;

  let newCourse = new Course(courseInit);

  newCourse.save(err => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not add/create courses' });

    return res.status(201).json({
      status: true,
      message: 'new course created',
      data: newCourse
    });
  });
};
const getAllCoursesByQueryFilter = (req, res) => {
  let filter = {};
  const query = req.query;
  if(query.courseId) filter._id = query.courseId;
  if(query.categoryId) filter.categoryId = query.categoryId;
  if(query.userId) filter.userId = query.userId;
  console.log('filter', filter)

  Course.find(filter)
    .then(courses => {
      return res.status(200).json({
        status: true,
        message: 'list of courses',
        data: courses
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve courses' });

    })
}
// const getCourseByFilter = (req, res) => { };
const updateCourseById = (req, res) => {
  const courseId = req.params.courseId;
  // const userId = req.authUser.currentUserId;
  const filter = {_id : courseId};

  const {
    title,
    description,
    categoryId,
    price,
    published
  } = req.body;

  Course.findOne(filter)
    .then(courseItem => {
      if (!courseItem) return res.status(400).json({ status: false, error: 'Server error:: Could not find to upd courses' });

      // Update course
      if (title) courseItem.title = title;
      if (description) courseItem.description = description;
      if (categoryId) courseItem.categoryId = categoryId;
      if (published) courseItem.published = published;
      if (price) courseItem.price = price;

      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not aupdate courses' });

        return res.status(201).json({
          status: true,
          message: ' course updated',
          data: courseItem
        });
      
      });



    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve courses' });

    })
};
const deleteCourseById = (req, res) => {
  const courseId = req.params.courseId;
  Course.findByIdAndDelete({_id: courseId})
    .then(result => {
      return res.status(200).json({
        status: true,
        message: 'Course deleted'
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not delete courses' });

    })
};


module.exports = {
  createCourse,
  getAllCoursesByQueryFilter,
  // getCourseByFilter,
  updateCourseById,
  deleteCourseById
};