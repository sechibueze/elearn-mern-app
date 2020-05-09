
function checkAdmin(req, res, next) {

  try {
    const authUser = req.authUser;
    const isAdmin = authUser.auth.includes('admin');
    if (!isAdmin) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized::only admins are allowed'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      error: 'Error::only admins are allowed'
    });
  }
}

module.exports = checkAdmin;