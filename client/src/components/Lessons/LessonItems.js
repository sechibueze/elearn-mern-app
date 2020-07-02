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