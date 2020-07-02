import React, { Fragment, useEffect } from 'react';
import DashboardActions from './DashboardActions';
import AuthContainer from '../AuthContainer';
import UserCourses from './Subscriptions';
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

  // useEffect(() => {
  //   loadCourses();
  // }, [subscribe, unsubscribe]);

  // if (!userCourses) return <Loader />
  // if (subscriptions && subscriptions.length < 1) return 
  return (
    <Fragment>
      <AuthContainer>

      <div className="container">
        <h2 className='text-lead'>Welcome {currentUser && currentUser.name} </h2>

        {/* <DashboardActions /> */}
        
        
      </div>
    </AuthContainer>
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