import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../_actions/courseActions';
import Loader from '../Loader';
import CourseCard from './CourseCard';

const Courses = ({loading, loadCourses, userCourses }) => {

  useEffect(() => {
    loadCourses()
  }, [])
  // const courses = [1, 2, 3, 4, 5, 6]

  if(loading && !userCourses) return <Loader />
  return (
    <Fragment>
      <div className="container">
        <input className="search-input" name="item" placeholder="Search courses..." />
      </div>

      <div className="section courses">
        <div className="container">
          <h2 className="section-title">Recommended courses</h2>
          <div className="line"></div>
          <div className="flex-wrapper course-card-flex-wrapper">
            {
              userCourses && userCourses.length > 0 ? 
                userCourses.map(course => <CourseCard key={course._id} course={course} />) :
                <h1 className='text-lead'> No courses yet</h1>
            }          
          </div>

        </div>
      </div>
    </Fragment>
  );
}
Courses.propTypes = {
  loadCourses: PropTypes.func.isRequired
};
 const mapStateToProps = state => ({
   userCourses: state.courses.userCourses,
   loading: state.auth.loading
 });
export default connect(mapStateToProps, { loadCourses })(Courses);