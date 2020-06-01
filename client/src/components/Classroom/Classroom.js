import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourseById } from '../../_actions/courseActions';

import Loader from '../Loader';
const Classroom = ({ match, loadCourseById, currentCourse }) => {
  const courseId = match.params.courseId;
  useEffect(() => {
    loadCourseById(courseId);
  }, [courseId]);
  const [currentLessonUrl, setCurrentLessonUrl] = useState('http://res.cloudinary.com/sechibueze/image/upload/v1590973470/znjpekxghyltx1gllon6.png');
  const setCuurentLesson = lessonUrl => {
    console.log('Cuureently selecte lesson', lessonUrl)
  };
  if(!currentCourse) return <Loader />

  const { _id, title, courseImage, lessons  } = currentCourse;
  return (
    <Fragment>
      <div className="classroom-wrapper">
        <header className="header">
          <img className="video-player" alt='video photos fro class' src={currentLessonUrl} />
          <h3 className="bg-dark course-title">
            {  title && title }
          </h3>

          <ul className="classroom-actions">
            <li><a href="/lessons">Lessons</a></li>
            <li><a href="/questions.html">Q&A</a></li>
            <li><a href="/notes.html">Note</a></li>
          </ul>
        </header>
        <div className="lesson-playlist">
          {currentCourse && currentCourse.lessons.map((lesson, idx) => (
            <div key={lesson._id} onClick={() => setCurrentLessonUrl(lesson.content.contentUrl)} className="lesson-item" data-lesson={lesson.content.contentUrl}>
              <div className="lesson-item-content">
                <span className="lesson-id"> {++idx} </span>
                <h3 className="lesson-title">
                  { lesson.title }
              </h3>
                <span className="fa fa-check-circle lesson-status"></span>
              </div>
            </div>
          ))}

          
        </div>
      </div>
    </Fragment>
  );
}
Classroom.propTypes = {
  loadCourseById: PropTypes.func.isRequired
};
 const mapStateToProps = state => ({
   currentCourse: state.courses.currentCourse
 });
export default connect(mapStateToProps, { loadCourseById })(Classroom);