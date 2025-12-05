const { findById } = require("../data/user");

module.exports = async function isAdmin(req, res, next) {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
    }

    // Fetch user from database
    const user = await findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid" });
    }
    // console.log(user);
    // Check admin flag
    if (user.is_admin !== true) {
      return res.status(403).json({ error: "You are not eligible" });
    }

    next();
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
