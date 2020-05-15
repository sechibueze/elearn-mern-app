
function checkTeacher(req, res, next) {
  
  try {
    const authUser = req.authUser;
    const isTeacher = authUser.auth.includes('teacher');
    if (!isTeacher) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized::only teachers are allowed'
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