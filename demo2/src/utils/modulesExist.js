const { findByModuleCode } = require("../data/permissionModule");

module.exports = async function isIDExist(req, res, next) {
  try {
    const userId = req.body.module_Code ?? undefined;

    if (!userId) {
      return res.status(401).json({ error: "module code not provided" });
    }

    // Fetch user from database
    const user = await findByModuleCode(userId);
    // console.log(userId, user);
    if (!user) {
      return res.status(401).json({ error: "Modules code not exist" });
    }

    next();
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
