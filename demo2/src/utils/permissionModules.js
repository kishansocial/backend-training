const { getById } = require("../data/permissionModule");

module.exports = async function isIDExist(req, res, next) {
  try {
    const userId = req.params.id;

    // Fetch user from database
    const user = await getById(userId);
    console.log(userId, user);
    if (!user) {
      return res.status(401).json({ error: "Modules not exist" });
    }

    next();
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
