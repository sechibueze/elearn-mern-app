import React, { Fragment } from 'react';
import DashboardActions from './DashboardActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
const Dashboard = ({loading, currentUser }) => {
  if (loading) return <Loader />
  return (
    <Fragment>
      <div className="container">
      <h2 className='text-lead'>Welcome {currentUser && currentUser.name} </h2>

        <DashboardActions />


      </div>
    </Fragment>
  );
}
Dashboard.propTypes = {
  currentUser: PropTypes.object.isRequired
};
 const mapStateToProps = state => ({
   currentUser: state.auth.currentUser,
   loading: state.auth.loading
 });
export default connect(mapStateToProps)(Dashboard);