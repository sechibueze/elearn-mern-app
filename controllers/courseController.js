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
  } = req.body;
  console.log('body add course', req.body)
  console.log('file add course', req.file)
  let courseInit = { userId, title, description, categoryId };
  if (price) courseInit.price = price;
  const courseImageLink = getDataURI(req) || req.body.courseImage;
  cloudinaryUploader.upload(courseImageLink)
    .then(result => {
      const courseImageUrl = result.secure_url;
      const courseImagePublicId = result.public_id;
      courseInit.courseImage = { courseImageUrl, courseImagePublicId};
      let newCourse = new Course(courseInit);

      newCourse.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not add/create courses' });

        return res.status(201).json({
          status: true,
          message: 'new course created',
          data: newCourse
        });
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Failed to upload course files' });

    });
  
};

const getAllCoursesByQueryFilter = (req, res) => {
  let filter = {};
  const query = req.query;
  if(query.courseId) filter._id = query.courseId;
  if(query.categoryId) filter.categoryId = query.categoryId;
  if(query.userId) filter.userId = query.userId;
  if (query.published) filter.published = query.published;
  

  Course.find(filter)
    .populate({
      path: 'categoryId',
      select: ['title'],
      model: Category
    })
    .populate({
      path: 'userId',
      select: ['name'],
      model: User
    })
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
const getCourseById = (req, res) => {
  const { courseId } = req.params;
  Course.findOne({_id: courseId})
    .populate({
      path: 'categoryId',
      select: ['title'],
      model: Category
    })
    .populate({
      path: 'userId',
      select: ['name', 'avartar'],
      model: User
    })
    .then(course => {
      return res.status(200).json({
        status: true,
        message: 'Requested course',
        data: course
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve courses' });

    })
}

const updateCourseById = (req, res) => {
  const courseId = req.params.courseId;
  const currentUserId = req.authUser.id;

  const {
    title,
    description,
    categoryId,
    price,
    published,
    courseImage
  } = req.body;
  const canUpdateCourseImage = getDataURI(req) || courseImage;
  Course.findOne({ _id: courseId })
    .then(async courseItem => {
      if (!courseItem) return res.status(400).json({ status: false, error: 'Server error:: Could not find to upd courses' });
      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });

      // Update course
      if (title) courseItem.title = title;
      if (description) courseItem.description = description;
      if (categoryId) courseItem.categoryId = categoryId;
      if (published) courseItem.published = published;
      if (price) courseItem.price = price;

      if ( canUpdateCourseImage ) {
        try {
          const result = await updateCloudinaryMediaContent(courseItem.courseImage.courseImagePublicId, canUpdateCourseImage)
          courseItem.courseImage.courseImageUrl = result.secure_url;
        } catch (error) {
          return res.status(500).json({ status: false, error: 'Failed to update course Image' });

        }
      }
      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not aupdate courses' });

        return res.status(201).json({
          status: true,
          message: 'course updated',
          data: courseItem
        });
      
      });



    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve courses' });

    })
};

const toggleCourseVisibility = (req, res) => {
  const courseId = req.params.courseId;
  const currentUserId = req.authUser.id;
  const auth = req.authUser.auth;
  let filter = { _id : courseId };
  // Admin can change the visibility of any course
  // A teacher can only change his own course
  if (!auth.includes('admin')) {
    filter.userId = currentUserId;
  }
  console.log('setting course visibility filter', filter);
  Course.findOne(filter)
    .then(courseItem => {
      console.log('setting course visibility course', courseItem);
      if (!courseItem) return res.status(400).json({ status: false, error: 'The requested course was not found' });

      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });

      // Update course that has at least one lesson
      if (courseItem.lessons.length < 1) return res.status(400).json({ status: false, error: 'You cannot publish a course without a lesson' });
      
      courseItem.published = !courseItem.published;
    
      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not aupdate courses' });

        return res.status(200).json({
          status: true,
          message: 'course visibilty updated',
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

const subscribeUserToCourse = (req, res) => {
  const courseId = req.params.courseId;
  const currentUserId = req.authUser.id;
  // const auth = req.authUser.auth;
  // let filter = { _id: courseId };
  // TODO
  // Find the course
  // Check that user has not subscribe => if yes
  // Subscribe the User to course
  
  Course.findOne({ _id: courseId })
    .then(courseItem => {
      // console.log('setting course visibility course', courseItem);
      if (!courseItem) return res.status(400).json({ status: false, error: 'The requested course was not found' });

      // User can only susbscribe once to a course
      // if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });
      if(courseItem.subscriptions.some(sub => sub.subscriber.toString() === currentUserId)){
        return res.status(400).json({ status: false, error: 'You cannot only aubscibe once to a course' });
      }

      // User has not subscribed, subscribe him
      courseItem.subscriptions.unshift({ subscriber: currentUserId});

      
      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not subscribe user to courses' });

        return res.status(200).json({
          status: true,
          message: 'User subscribe to course',
          data: courseItem
        });

      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve courses' });

    })
};

const unsubscribeUserToCourse = (req, res) => {
  const courseId = req.params.courseId;
  const currentUserId = req.authUser.id;
  const auth = req.authUser.auth;
  Course.findOne({ _id: courseId })
    .then(courseItem => {
      // console.log('setting course visibility course', courseItem);
      if (!courseItem) return res.status(400).json({ status: false, error: 'The requested course was not found' });

      
      // Unsubscribe the User from course
      courseItem.subscriptions = courseItem.subscriptions.filter(sub => sub.subscriber.toString() !== currentUserId) 

      courseItem.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not unsubscribe user from courses' });

        return res.status(200).json({
          status: true,
          message: 'course has been Unsubscribed success',
          data: courseItem
        });

      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve courses' });
    })
};
// Get all courses that a user is subscribed to
const getCourseSubscriptionByUserId = (req, res) => {
  // const courseId = req.params.courseId;
  const currentUserId = req.authUser.id;
  let filter = {
    'subscriptions.subscriber': currentUserId
  };
  // console.log('course subscibers', currentUserId)
  Course.find(filter)
    .then(courseItem => {
     
        return res.status(200).json({
          status: true,
          message: 'All courses subscribed',
          data: courseItem
        });

      // });
    })
    .catch(err => {
      return res.status(500).json({ status: false, err, error: 'Server error:: Could not get subscription courses courses' });

    })
};
const addLesson = (req, res) => {
  const courseId = req.params.courseId;
  const lessonLink = getDataURI(req) || req.body.content;
  const currentUserId = req.authUser.id;
  console.log('lessonlink to be added', lessonLink)
  // TODO : edit
  // Find the course
  // Confirm the course exists
  // Confirm the editor is the course creator
  // Upload content
  // Update the course.lesson
  // Save back
      Course.findOne({ _id: courseId })
        .then(courseItem => {
          if (!courseItem) return res.status(400).json({ status: false, error: 'The course you requested does not exist' });
          // CourseItem was found
          console.log('courseItem was found ')
          if (courseItem.userId.toString() !== currentUserId) return res.status(400).json({ status: false, error: 'You can only add lessons to the courses you created' });
        //  course is added by course creator
          console.log('courseItem has right owner ')
          cloudinaryUploader.upload(lessonLink) // , { resource_type: "video" }
            .then(result => {
              let content = {};
              content.publicId = result.public_id;
              content.contentUrl = result.secure_url;
              let lessonItem = { content };
              const {title, type, access, note } = req.body;
              if (title) lessonItem.title = title;
              if (type) lessonItem.type = type;
              if (access) lessonItem.access = access;
              if (note) lessonItem.note = note;
              courseItem.lessons.unshift(lessonItem);
              console.log('çourse item lessons::', courseItem.lessons)
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
              console.log('Uploade error ', err)
              return res.status(500).json({ status: false, error: 'Server error:: Could not upload lesson courses' });
            }) 
         
        })
        .catch(err => {
          return res.status(500).json({ status: false, error: 'Server error:: Could not find courses' });
        });
    
};
const getLessonByCourseId = (req, res) => {
  const {courseId, lessonId} = req.params;
  const currentUserId = req.authUser.id;
  Course.findOne({ _id: courseId })
    .then(courseItem => {
      if (!courseItem) return res.status(400).json({ status: false, error: 'Could not find courses' });

      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });
      
      if (courseItem.lessons.some(lessonItem => lessonItem._id.toString() === lessonId)) {
        let _ = courseItem.lessons.filter(lesson => lesson._id.toString() === lessonId);
        return res.status(200).json({
          status: true,
          message: 'Lesson found',
          data: _[0]
        });
      }

      return res.status(404).json({
          status: false,
          error: 'Lesson not found'
        });
      
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not find courses' });

    });
};

const editlessonById = async (req, res) => {
  const courseId = req.params.courseId;
  const lessonId = req.params.lessonId;
  const currentUserId = req.authUser.id;

  Course.findOne({ _id: courseId })
    .then(courseItem => {
      if (!courseItem) return res.status(400).json({ status: false, error: 'Could not find courses' });

      // User can only edit his course
      if (courseItem.userId.toString() !== currentUserId) return res.status(401).json({ status: false, error: 'You can only edit your courses' });

      const { type, access, title, content, note } = req.body;
      // if (note) lessonItem.note = note;
      let canUpdateContentData = getDataURI(req) || content;
      // console.log('can update', canUpdateContentData)//undefined
      courseItem.lessons.map(async (lessonItem) => {
        if (lessonItem._id.toString() === lessonId) {
          if (type) lessonItem.type = type;
          if (access) lessonItem.access = access;
          if (note) lessonItem.note = note;
          if (title) lessonItem.title = title;
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
  getCourseById,
  getAllCoursesByQueryFilter,
  updateCourseById,
  deleteCourseById,

  subscribeUserToCourse,
  unsubscribeUserToCourse,
  getCourseSubscriptionByUserId,

  addLesson,
  getLessonByCourseId,
  editlessonById,
  removelessonById,
  toggleCourseVisibility
};