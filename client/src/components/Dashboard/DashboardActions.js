import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashboardActions = ({ currentUser}) => {
  // const userActions = ();
  const teacherRequest = (userId, action) => {

    console.log('Requested payload', userId, action);
  };
  const hasRequiredAuth = (authRecord, auth) => {
    return authRecord.indexOf(auth) > -1;
  }
  const teacherActions = ( 
    <Link to="/course-items"> My Course Items</Link>
  );
  const adminActions = (
    <Fragment>
      <Link to="/category-items">Category Items</Link>
      <Link to="/manage-courses"> Manage Course Items</Link>
      <Link to="/users"> Users </Link>
      {teacherActions}
    </Fragment>
  );
  return (
    <Fragment>
      <div className="dashboard-actions">

        <Link to="/active-courses">My Courses</Link>
        <Link to="/cart">My Cart</Link>
        {/* { currentUser && !currentUser.auth.includes('teacher') ? (
          <span onClick={() => teacherRequest(currentUser.id, 'BECOME_TEACHER') } >Become Teacher</span>
        ): null} */}
        
        {currentUser && hasRequiredAuth(currentUser.auth, 'teacher') && teacherActions }
        { currentUser && hasRequiredAuth(currentUser.auth, 'admin') && adminActions }
      </div>
    </Fragment>
  );
}
 const mapStateToProps = state => ({
   currentUser: state.auth.currentUser
 });
export default connect(mapStateToProps)(DashboardActions);