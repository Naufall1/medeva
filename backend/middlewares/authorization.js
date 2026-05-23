function adminOnly(req, res, next) {
  if (!req.user.is_admin) {
    return res.status(403).json({
      message: 'Forbidden: Access denied.',
    })
  }

  next()
}

module.exports = adminOnly;