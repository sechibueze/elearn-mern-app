import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUsers, manageUserAuth } from '../../_actions/adminActions';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
const Users = ({ loadUsers, manageUserAuth, users, userAuth }) => {
  const [actionType, setActionType] = useState('')
  useEffect(() => {
    loadUsers()
  }, [userAuth])
  if(!users) return <Loader />
  const handleChange = ({ target }) => {
    setActionType(target.value)
  }
  const toggleUserAuth = (userId, actionType) => {
    if (!actionType) {
      alert('Action is required')
      return;
    }
    manageUserAuth(userId, actionType)
  }
  return (
    <Fragment>
      <AuthContainer>
        <div className="container">
        
        <table className="table mt-1">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name </th>
              <th>Email</th>
              <th> Auth </th>
              <th> Action </th>
              <th> Go </th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.map((user, idx) => (
                <tr key={idx}>
                  <td> {`${++idx}`} </td>
                  <td> { user.name } </td>
                  <td> { user.email } </td>
                  <td> { user.auth.join() } </td>
                  <td> 
                      <select name='actionType' onChange={handleChange}> 
                        <option value='' selected > Select action </option>
                        <option value='TOGGLE_ADMIN'> TOGGLE ADMIN </option>
                        <option value='BECOME_TEACHER'> BECOME TEACHER </option>
                        <option value='REMOVE_TEACHER'> REMOVE TEACHER </option>
                      </select>
                  </td>
                  <td> <span onClick={() => toggleUserAuth(user._id, actionType)}>Go</span> </td>
                  
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      </AuthContainer>
    </Fragment>
  );
}
 
Users.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  manageUserAuth: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  users: state.admin.users,
  userAuth: state.admin.userAuth
});
export default connect(mapStateToProps, { loadUsers, manageUserAuth })(Users);