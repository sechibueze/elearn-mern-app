function authReducer(authState, action) {
  const { type } = action;
  switch (type) {
    case 'REMOVE_TEACHER':
      return authState.filter(state => state != 'teacher')
    case 'BECOME_TEACHER':
      return !authState.includes('teacher') ? authState.concat('teacher') : authState;
    case 'TOGGLE_ADMIN':
      return !authState.includes('admin') ? authState.concat('admin') : authState.filter(state => state !== 'admin');
    default:
      return authState;
  }
}
module.exports = authReducer;