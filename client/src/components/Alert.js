import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearAlert } from '../_actions/alertActions';

const Alert = ({ alertBucket, filter, type, clearAlert}) => {
  const displayAlerts = filter ? alertBucket.filter(alert => alert.type === filter) : alertBucket;
  return (
    <Fragment>
      {displayAlerts.length > 0 && displayAlerts.map(alert => 
        (
        <div key={`${alert.alertId}`} className={`mr-1 alert alert-${type ? type : 'danger'}`}>
          { alert.alertText }
          <span className='fa fa-close' onClick={() => clearAlert(alert.alertId)} />
          </div>))
      }    
    </Fragment>
  );
}
Alert.propTypes = {
  alertBucket: PropTypes.array.isRequired,
  type: PropTypes.string,
  filter: PropTypes.string,
  clearAlert: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  alertBucket: state.alerts.alertBucket
  
});
export default connect(mapStateToProps, { clearAlert })(Alert);