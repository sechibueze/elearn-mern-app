import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadCourseById } from '../../_actions/courseActions';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import ShowCourseInfo from './ShowCourseInfo';
const CourseInfo = ({
  courseInfoId,
  loading, 
  courseInfo, 

  subscribe,
  unsubscribe,
  loadCourseById }) => {
  
  useEffect(() => {
    loadCourseById(courseInfoId);
  }, [courseInfoId, subscribe, unsubscribe]);

  if(loading && !courseInfo) return <Loader />
  
  return (
    <Fragment>
      {
        courseInfo && (<ShowCourseInfo courseInfo={courseInfo} />)       
      }
    </Fragment>
  );
}
 
CourseInfo.propTypes = {
  loadCourseById: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  courseInfo: state.courses.courseInfo,
  subscribe: state.courses.subscribe,
  unsubscribe: state.courses.unsubscribe,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { loadCourseById })(CourseInfo);