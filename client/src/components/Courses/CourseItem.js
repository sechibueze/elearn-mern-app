import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourseById } from '../../_actions/courseActions';
import Loader from '../Loader';
import PropTypes from 'prop-types';

const CourseItem = ({ match, loading, currentCourse, loadCourseById }) => {
  
  const { courseId } = match.params;
  useEffect(() => {
    loadCourseById(courseId);
  }, []);
  if( loading && !currentCourse) return <Loader />
  // const courseItem = currentCourse ? currentCourse[0] : null;
  return (
    <Fragment>
      {currentCourse && currentCourse._id}
      <div className="container">
        <div className="course-item">
          <div className="course-intro">
            <img className="video-player" alt='video' src="/img/products/data-analytics.png" />
          </div>
          <a href="/classNameroom.html" className="btn btn-primary btn-md btn-block">Go to className || enroll</a>
          <div className="course-overview card">
            <h3 className="card-title"> Course Overview</h3>
            <article className="card-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum dolor,
              sed eveniet possimus dolore omnis suscipit! Quaerat nemo numquam ex.
            </article>
          </div>

          <div className="card">
            <h3 className="card-title"> Course Objective</h3>
            <ul className="card-list">
              <li className="fa fa-check"> How to Desgn websites</li>
              <li className="fa fa-check"> Mobile Applications fro all</li>
              <li className="fa fa-check"> Lorem ipsum dolor sit amet consectetur.</li>              
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title"> Prerequisite </h3>
            <ul className="card-list">
              <li className="fa fa-check"> How to Desgn websites</li>
              <li className="fa fa-check"> Mobile Applications fro all</li>
              <li className="fa fa-check"> Lorem ipsum dolor sit amet consectetur.</li>
              <li className="fa fa-check"> Lorem ipsum dolor sit amet consectetur.</li>
              <li className="fa fa-check"> Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </div>

          <div className="course-data card">
            <span className="fa fa-users">&nbsp; 39</span>
            <span className="fa fa-key">&nbsp; 03</span>
            <span className="fa fa-thumbs-up">&nbsp; 33</span>
          </div>
          <div className="course-owner credit">
            <img className="person" src="/img/products/data-analytics.png" />
            <div className="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eaque repellat ipsam.
              <a className="btn btn-success btn-block btn-sm" href="/person.html"> View Profile</a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
CourseItem.propTypes = {
  loadCourseById: PropTypes.func.isRequired,
  currentCourse: PropTypes.object
};
const mapStateToProps = state => ({
  currentCourse: state.courses.currentCourse,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { loadCourseById })(CourseItem);