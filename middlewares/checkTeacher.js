
function checkTeacher(req, res, next) {
  
  try {
    const authUser = req.authUser;
    const isTeacher = authUser.auth.includes('teacher') || authUser.auth.includes('admin');
    if (!isTeacher) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized::only teachers or admins are allowed'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      error: 'Error::only teachers are allowed'
    });
  }
}

module.exports = checkTeacher;