const { checkUserPermission } = require("../data/userPermission");
const { findById } = require("../data/user");

// permissionType = "can_create" | "can_update" | "can_delete" | "can_view"
function checkPermission(permissionType) {
  return async (req, res, next) => {
    try {
      const userId = req.cookies?.userId;
      if (!userId) {
        return res.status(401).json({ error: "User not logged in" });
      }
      const user = await findById(userId);
      if (!user) {
        return res.status(401).json({ error: "Invalid User" });
      }

      // ✅ If user is admin, skip permission check
      if (user.is_admin === true) {
        return next();
      }

      const userWant = req.params?.id ?? undefined;

      if (userId == userWant) {
        next();
      }
      if (!userId) {
        return res.status(401).json({ error: "User not logged in" });
      }

      const hasPermission = await checkUserPermission(
        userId,
        "USER",
        permissionType
      );

      if (!hasPermission) {
        return res.status(403).json({ error: "Permission Denied" });
      }

      next();
    } catch (e) {
      res.status(500).json({ error: "Permission check failed" });
    }
  };
}

module.exports = checkPermission;
