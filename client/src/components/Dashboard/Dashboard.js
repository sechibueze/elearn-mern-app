import React, { Fragment, useEffect } from 'react';
import DashboardActions from './DashboardActions';
import UserCourses from './UserCourses';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadCourses, subscribeUserToCourse } from '../../_actions/courseActions';
import Loader from '../Loader';
const Dashboard = ({
  loadCourses, userCourses,
  loading, currentUser, subscribeUserToCourse, subscriptions,
  subscribe, unsubscribe
 }) => {

  useEffect(() => {
    loadCourses();
  }, [subscribe, unsubscribe]);

  if (!userCourses) return <Loader />
  // if (subscriptions && subscriptions.length < 1) return 
  return (
    <Fragment>
      <div className="container">
      <h2 className='text-lead'>Welcome {currentUser && currentUser.name} </h2>

        <DashboardActions />
        {/* <UserCourses /> */}
        <div clasName="flex-wrapper course-card-flex-wrapper">
          {
            userCourses.length > 0 ?
              userCourses.map(subCourse => (
                <div className="card course-card">
                  {/* <img src={subCourse.courseImage.courseImageUrl} alt='product of course' className="card-image" /> */}
                  <p className="card-title"> {subCourse.title} </p>
                  <div className="card-content">
                    {subCourse.description}
                  </div>
                  <div className="card-footer">
                    <h3 className='text-sub'> <sup>N</sup> {subCourse.price === 'free' ? 0 : subCourse.price} </h3>
                    <div className="course-card-cta">
                      <span onClick={() => { subscribeUserToCourse(subCourse._id)}} className="fa fa-cart-plus add2cart-btn btn-primary"> &nbsp; Subscribe </span>
                      {/* <Link to={`/classroom/${subCourse._id}/lessons`} className="fa fa-user buynow-btn btn-dark"> &nbsp; Classroom </Link> */}
                    </div>
                  </div>
                </div>
              )) : (
                <h2 className='text-lead'>Sub to Recommended courses </h2>
              )
          }

        </div>
        
      </div>
    </Fragment>
  );
}
Dashboard.propTypes = {
  subscribeUserToCourse: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
 const mapStateToProps = state => ({
   currentUser: state.auth.currentUser,
   userCourses: state.courses.userCourses,
   subscriptions: state.courses.subscriptions,
   subscribe: state.courses.subscribe,
   unsubscribe: state.courses.unsubscribe,
   loading: state.auth.loading
 });
export default connect(mapStateToProps, { loadCourses, subscribeUserToCourse })(Dashboard);