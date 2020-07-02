import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourseById } from '../../_actions/courseActions';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
import ClassroomLessons from './ClassroomLessons';

const Classroom = ({ match, loading, loadCourseById, courseInfo }) => {

  const {courseId} = match.params;

  useEffect(() => {
    loadCourseById(courseId);
  }, [courseId]);

  
  if(loading && !courseInfo) return <Loader />

  
  return (
    <AuthContainer>
      <Fragment>
        {
          courseInfo && ( <ClassroomLessons courseInfo={courseInfo} /> )
        }
      </Fragment>
    </AuthContainer>
  );
}
Classroom.propTypes = {
  loadCourseById: PropTypes.func.isRequired
};
 const mapStateToProps = state => ({
   loading: state.auth.loading,
   courseInfo: state.courses.courseInfo
 });

export default connect(mapStateToProps, { loadCourseById })(Classroom);