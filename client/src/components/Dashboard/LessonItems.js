import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadCourseById } from '../../_actions/courseActions';
import AddLesson from './AddLesson';
import Loader from '../Loader';

const LessonItems = ({ match, loadCourseById, currentCourse, newLesson }) => {
  const courseId = match.params.courseId;
  useEffect(() => {
    loadCourseById(courseId);
  }, [courseId, newLesson]);
  const editLesson = lessonId => {
    if (window.confirm('Are you sure')) {
      alert('id ' + lessonId)
    }
  }
  const deleteLesson = lessonId => {
    if (window.confirm('Are you sure')) {
      alert('id ' + lessonId)
    }
  }
  if(!currentCourse) return <Loader />
  
  return (
    <Fragment>
      <div className="container">
        {courseId}
        Lesson items
        <AddLesson courseId={courseId} />
        {currentCourse && currentCourse.lessons && currentCourse.lessons.length < 1 ?
          (<h2> No lessons yet</h2>) :
         (
           <Fragment>
              <Link to={`/classroom/${currentCourse._id}/lessons`}
                className="btn btn-primary"
              > Go to Class</Link>
              <table className="table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>View</th>
                    <th>Lesson Type</th>
                    <th>Lesson Access</th>
                    <th>Lesson Note</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourse && currentCourse.lessons.map((lesson, idx) => (
                    <tr key={lesson._id}>
                      <td> {++idx} </td>
                      <td> View </td>
                      <td> {lesson.title} </td>
                      <td> {lesson.type} </td>
                      <td> {lesson.access} </td>
                      <td> {lesson.note} </td>
                      
                      <td> <span onClick={() => editLesson(lesson._id)} className="fa fa-edit" /> </td>
                      <td> <span onClick={() => deleteLesson(lesson._id)} className="fa fa-close" /> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </Fragment>
         )
        }
        
      </div>
    </Fragment>
  );
};
 LessonItems.propTypes = {
   loadCourseById: PropTypes.func.isRequired
 };

 const mapStateToProps = state => ({
   currentCourse: state.courses.currentCourse,
   newLesson: state.courses.newLesson
 });
export default connect(mapStateToProps, { loadCourseById })(LessonItems);