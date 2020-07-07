import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../_actions/courseActions';
import Loader from '../Loader';
import Alert from '../Alert';
import AuthContainer from '../AuthContainer';
import CoursesList from './CoursesList';
// import { Link } from 'react-router-dom';

const CoursesAdmin = ({
  loading,
  currentUser,
  coursesList,

  loadCourses,

  newCourse,
  deletedCourse,
  updatedCourse,
  courseVisibilityStatus

}) => {
 
  useEffect(() => {
    
    // Load all courses for admin but filter for teacher
    let filter = !currentUser.auth.includes('admin') ? { userId: currentUser._id} : null;
    loadCourses(filter);
  }, [
    newCourse, 
    deletedCourse, 
    updatedCourse,
    courseVisibilityStatus
  ]);

  if(loading && coursesList.length === 0) return <Loader />

  return ( 
    <Fragment>
      <AuthContainer>
        <h1> Courses Admin</h1>
        <Alert origin='CREATE_COURSE_SUCCESS' type='success' />
        <Alert origin='UPDATE_COURSE_SUCCESS' type='success' />
        <Alert origin='COURSE_VISIBILITY_SUCCESS' type='success' />
        <Alert origin='COURSE_VISIBILITY_ALERT' />
        <CoursesList list={ coursesList } />
      </AuthContainer>
    </Fragment>
   );
}

CoursesAdmin.propTypes = {
  loadCourses: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  currentUser: state.auth.currentUser,
  coursesList: state.courses.coursesList,
  newCourse: state.courses.newCourse,
  deletedCourse: state.courses.deletedCourse,
  updatedCourse: state.courses.updatedCourse,
  courseVisibilityStatus: state.courses.courseVisibilityStatus,
});
export default connect(mapStateToProps, { loadCourses })(CoursesAdmin);
 
