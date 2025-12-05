const { checkUserPermission } = require("../data/userPermission");

// permissionType = "can_create" | "can_update" | "can_delete" | "can_view"
function checkPermission(permissionType) {
  return async (req, res, next) => {
    try {
      const userId = req.cookies?.userId;
      const userWant = req.params.id;

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
