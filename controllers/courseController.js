const { validationResult } = require('express-validator');
const { getDataURI } = require('../_utils/dataURI')
const { cloudinaryUploader, updateCloudinaryMediaContent } = require('../config/cloudinaryConfig')
const Course = require('../models/Course');

const createCourse = (req, res) => {
  userId = req.authUser.id;
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

const updateCourseById = (req, res) => {
  const courseId = req.params.courseId;
  const currentUserId = req.authUser.id;
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
      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });

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
  const currentUserId = req.authUser.id;
  // TODO
  // Let user only delete his courses
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



const addLesson = (req, res) => {
  const courseId = req.params.courseId;
  const lessonLink = getDataURI(req) || req.body.content;
  const currentUserId = req.authUser.id;
  // TODO : edit
  // Find the course
  // Confirm the course exists
  // Confirm the editor is the course creator
  // Upload content
  // Update the course.lesson
  // Save back
  cloudinaryUploader.upload(lessonLink)
    .then(result => {
      
      let content = {};
      const { public_id, secure_url} = result;
      content.publicId = public_id;
      content.lessonUrl = secure_url;
   
      
      Course.findOne({ _id: courseId })
        .then(courseItem => {
          if (!courseItem) return res.status(400).json({ status: false, error: 'The course you requested does not exist' });
          // CourseItem was found

          if (courseItem.userId.toString() !== currentUserId) return res.status(400).json({ status: false, error: 'You can only add lessons to the courses you created' });
         

         
          let lessonItem = {content};
          const { type, access, note } = req.body;
          if (type) lessonItem.type = type;
          if (access) lessonItem.access = access;
          if (note) lessonItem.note = note;
          courseItem.lessons.unshift(lessonItem);
          courseItem.save(err => {
            if (err) return res.status(500).json({ status: false, error: 'Could not save lesson courses' });

            return res.status(201).json({
              status: true,
              message: 'Lesson created',
              data: courseItem
            });
          });


        })
        .catch(err => {
          return res.status(500).json({ status: false, error: 'Server error:: Could not find courses' });

        });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not upload lesson courses' });

    }) 
};
// const getLessonByCourseId = (req, res) => {};
const editlessonById = async (req, res) => {
  const courseId = req.params.courseId;
  const lessonId = req.params.lessonId;
  const currentUserId = req.authUser.id;

  Course.findOne({ _id: courseId })
    .then(courseItem => {
      if (!courseItem) return res.status(400).json({ status: false, error: 'Could not find courses' });

      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });

      const { type, access, content, note } = req.body;
      // if (note) lessonItem.note = note;
      let canUpdateContentData = getDataURI(req) || content;
      // console.log('can update', canUpdateContentData)//undefined
      courseItem.lessons.map(async (lessonItem) => {
        if (lessonItem._id.toString() === lessonId) {
          if (type) lessonItem.type = type;
          if (access) lessonItem.access = access;
          if (note) lessonItem.note = note;
          if (canUpdateContentData) {
            const result = await updateCloudinaryMediaContent(lessonItem.content.publicId, canUpdateContentData)
            const contentUrl = result.secure_url;
            lessonItem.content.lessonUrl = contentUrl;
          }
          
        }
      });
      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Could not save lesson courses' });

        return res.status(200).json({
          status: true,
          message: 'Lesson edited',
          data: courseItem
        });
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not find courses' });

    });
};
const removelessonById = (req, res) => {
  const courseId = req.params.courseId;
  const lessonId = req.params.lessonId;
  const currentUserId = req.authUser.id;
  Course.findOne({ _id: courseId })
    .then(courseItem => {
      if (!courseItem) return res.status(400).json({ status: false, error: 'Could not find courses' });

      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });

      courseItem.lessons = courseItem.lessons.filter(lessonItem => lessonItem._id.toString() !== lessonId );
      
      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Could not save lesson courses' });

        return res.status(200).json({
          status: true,
          message: 'Lesson deleted',
          data: courseItem
        });
      });
    }).catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not find courses' });

    });
};

module.exports = {
  createCourse,
  getAllCoursesByQueryFilter,
  updateCourseById,
  deleteCourseById,

  addLesson,
  // getLessonByCourseId,
  editlessonById,
  removelessonById
};