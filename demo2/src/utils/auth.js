module.exports.authenticate = (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  // attach userId to request object for later use
  req.userId = userId;

  next();
};
