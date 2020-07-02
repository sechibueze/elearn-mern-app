import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const Authenticate = ({ component: Component, isAuthenticated, ...rest}) => (
  <Route 

    {...rest}

    render={props => !isAuthenticated ?
     (<Redirect to='/' />) : 
     (<Component {...props} />)
    }

  />
);
 
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Authenticate);