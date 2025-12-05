const pool = require("../config/db");

module.exports = {
  createPermissionModule: async (data) => {
    const { module_code, module_description, is_active, created_by } = data;

    const result = await pool.query(
      `INSERT INTO "PermissionModules" 
      (module_code, module_description, is_active, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING id,module_code, module_description, is_active, created_by`,
      [module_code, module_description, is_active, created_by]
    );

    return result.rows[0];
  },

  updatePermissionModule: async (id, data) => {
    const { module_code, module_description, is_active } = data;

    await pool.query(
      `UPDATE "PermissionModules"
       SET module_code=$1, module_description=$2, is_active=$3 
       WHERE id=$4`,
      [module_code, module_description, is_active, id]
    );
  },

  deletePermissionModule: async (id) => {
    await pool.query(`DELETE FROM "PermissionModules" WHERE id=$1`, [id]);
  },
  getById: async (id) => {
    const result = await pool.query(
      `SELECT * FROM "PermissionModules" WHERE id=$1`,
      [id]
    );
    return result.rows[0];
  },

  findByModuleCode: async (module_code) => {
    const result = await pool.query(
      `SELECT * FROM "PermissionModules" WHERE module_code=$1`,
      [module_code]
    );
    return result.rows[0];
  },
};
