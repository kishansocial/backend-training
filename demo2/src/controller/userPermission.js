const {
  createUserPermissionUC,
  updateUserPermissionUC,
} = require("../usecases/");

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;

      // Default values if missing
      const data = {
        user_id: body.user_id,
        module_code: body.module_code,
        can_create: body.can_create ?? false,
        can_update: body.can_update ?? false,
        can_delete: body.can_delete ?? false,
        can_view: body.can_view ?? false,
      };

      const result = await createUserPermissionUC(data);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const body = req.body;

      // Apply defaults only if values not provided
      const data = {
        can_create: body.can_create ?? false,
        can_update: body.can_update ?? false,
        can_delete: body.can_delete ?? false,
        can_view: body.can_view ?? false,
      };

      await updateUserPermissionUC(req.params.id, data);
      res.json({ message: "User permission updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
