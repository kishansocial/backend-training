const {
  createPermissionModuleUC,
  updatePermissionModuleUC,
  deletePermissionModuleUC,
} = require("../usecases");

module.exports = {
  create: async (req, res) => {
    try {
      const body = req.body;

      // Apply defaults if missing
      const data = {
        module_code: body.module_code,
        module_description: body.module_description || "Not Describe",
        is_active: body.is_active ?? true,
        created_by: req.cookies.userId,
        created_at: body.created_at || new Date(),
      };

      const result = await createPermissionModuleUC(data);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const body = req.body;
      const actual = req.permissionmodule;
      // Only update provided fields (others remain unchanged)
      const data = {
        module_code: body.module_code ?? actual.module_code,
        module_description:
          body.module_description ?? actual.module_description,
        is_active: body.is_active ?? true,
        created_by: actual.created_by,
        created_at: actual.created_at,
      };

      await updatePermissionModuleUC(req.params.id, data);
      res.json({ message: "Permission module updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await deletePermissionModuleUC(req.params.id);
      res.json({ message: "Permission module deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
