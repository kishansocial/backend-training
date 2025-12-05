const { findById } = require("../data/user");

module.exports = async function isAdmin(req, res, next) {
  try {
    const userId = req.body.user_id ?? undefined;

    if (!userId) {
      return res.status(401).json({ error: "User must provide" });
    }

    // Fetch user from database
    const user = await findById(userId);

    if (!user) {
      return res.status(401).json({ error: "user not exist" });
    }

    next();
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
