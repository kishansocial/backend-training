const { findById } = require("../data/user");

module.exports = async function authenticate(req, res, next) {
  const userId = req.cookies.userId;
  // console.log(req.body, req.formdata);
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  // Fetch user from database
  const user = await findById(userId);

  if (!user) {
    return res.status(401).json({ error: "Invalid" });
  }
  // attach userId to request object for later use
  req.userId = userId;

  next();
};
