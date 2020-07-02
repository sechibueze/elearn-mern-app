import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../_actions/courseActions';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import CourseItems from '../CourseItems';
import Navbar from '../Navbar';
import AuthContainer from '../AuthContainer';

const Courses = ({ loading, isAuthenticated, subscribe, unsubscribe, coursesList , loadCourses }) => {
  
  
  useEffect(() => {
    loadCourses({ published: true });
  }, [subscribe, unsubscribe]);

  if(loading && coursesList.length === 0) return <Loader />
 
  
  return (
    <Fragment>
      {
        !isAuthenticated ? (
          <Fragment>
            <Navbar />
            <CourseItems coursesList={coursesList} />
          </Fragment>
        ) : (
          <Fragment>
            <AuthContainer>
              
              <CourseItems coursesList={coursesList} /> 

            </AuthContainer>
          </Fragment>
        )
      }
           
    </Fragment>
  );
}
 
Courses.propTypes = {
  loadCourses: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  coursesList: state.courses.coursesList,
  subscribe: state.courses.subscribe,
  unsubscribe: state.courses.unsubscribe,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loadCourses })(Courses);