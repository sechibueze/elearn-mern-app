import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadCourseSubscriptionsByUserId, unsubscribeUserToCourse } from '../../_actions/courseActions';
import Loader from '../Loader';
import CourseCard from '../CourseCard';
import AuthContainer from '../AuthContainer';
const Subscriptions = ({
  loading, loadCourseSubscriptionsByUserId, subscriptions, unsubscribeUserToCourse,
  subscribe, unsubscribe
}) => {

  useEffect(() => {
    loadCourseSubscriptionsByUserId();
  }, [subscribe, unsubscribe]);

  if (loading && subscriptions.length === 0) return <Loader />

  return (
    <Fragment>
      <AuthContainer>
      
        <div className="container">
         
          <div className="flex-wrapper">
            {
              subscriptions.length > 0 ?
                subscriptions.map(subCourse => (
                  <CourseCard course={ subCourse} />
                  
                )) : (
                  <h2 className='text-lead'>Subscribe to Recommended courses </h2>
                )
            }

          </div>

        </div>
      </AuthContainer>
    </Fragment>
  );
}
Subscriptions.propTypes = {
  loadCourseSubscriptionsByUserId: PropTypes.func.isRequired,
  unsubscribeUserToCourse: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  subscriptions: state.courses.subscriptions,
  subscribe: state.courses.subscribe,
  unsubscribe: state.courses.unsubscribe,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { loadCourseSubscriptionsByUserId, unsubscribeUserToCourse })(Subscriptions);