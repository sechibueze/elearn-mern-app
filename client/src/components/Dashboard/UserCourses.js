import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadCourseSubscriptionsByUserId, unsubscribeUserToCourse } from '../../_actions/courseActions';
import Loader from '../Loader';
const UserCourses = ({
  loading, loadCourseSubscriptionsByUserId, subscriptions, unsubscribeUserToCourse,
  subscribe, unsubscribe
}) => {

  useEffect(() => {
    loadCourseSubscriptionsByUserId();
  }, [subscribe, unsubscribe]);

  if (loading) return <Loader />
  // if (subscriptions && subscriptions.length < 1) return 
  return (
    <Fragment>
      <div className="container">
        <div clasName="flex-wrapper course-card-flex-wrapper">
          {
            subscriptions.length > 0 ?
              subscriptions.map(subCourse => (
                <div className="card course-card">
                  {/* <img src={subCourse.courseImage.courseImageUrl} alt='product of course' className="card-image" /> */}
                  <p className="card-title"> {subCourse.title} </p>
                  <div className="card-content">
                    {subCourse.description}
                  </div>
                  <div className="card-footer">
                    <h3 className='text-sub'> <sup>N</sup> {subCourse.price === 'free' ? 0 : subCourse.price} </h3>
                    <div className="course-card-cta">
                      <span onClick={() => unsubscribeUserToCourse(subCourse._id) } className="fa fa-cart-plus add2cart-btn btn-primary"> &nbsp; Unsubscribe </span>
                      <Link to={`/classroom/${subCourse._id}/lessons`} className="fa fa-user buynow-btn btn-dark"> &nbsp; Classroom </Link>
                    </div>
                  </div>
                </div>
              )) : (
                <h2 className='text-lead'>Subscribe to Recommended courses </h2>
              )
          }

        </div>

      </div>
    </Fragment>
  );
}
UserCourses.propTypes = {
  loadCourseSubscriptionsByUserId: PropTypes.func.isRequired,
  unsubscribeUserToCourse: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  subscriptions: state.courses.subscriptions,
  subscribe: state.courses.subscribe,
  unsubscribe: state.courses.unsubscribe,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { loadCourseSubscriptionsByUserId, unsubscribeUserToCourse })(UserCourses);