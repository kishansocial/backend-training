const pool = require("../config/db");

module.exports = {
  createUserPermission: async (data) => {
    const {
      user_id,
      module_code,
      can_create,
      can_update,
      can_delete,
      can_view,
    } = data;

    const result = await pool.query(
      `INSERT INTO "UserPermissions" 
      (user_id, module_code, can_create, can_update, can_delete, can_view)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [user_id, module_code, can_create, can_update, can_delete, can_view]
    );

    return result.rows[0];
  },

  updateUserPermission: async (id, data) => {
    const { can_create, can_update, can_delete, can_view } = data;

    await pool.query(
      `UPDATE "UserPermissions"
       SET can_create=$1, can_update=$2, can_delete=$3, can_view=$4 
       WHERE id=$5`,
      [can_create, can_update, can_delete, can_view, id]
    );
  },

  findUserPermission: async (user_id, module_code) => {
    const result = await pool.query(
      `SELECT * FROM "UserPermissions" 
       WHERE user_id=$1 AND module_code=$2`,
      [user_id, module_code]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query(
      `SELECT * FROM "UserPermissions" WHERE id=$1`,
      [id]
    );
    return result.rows[0];
  },
  checkUserPermission: async (user_id, module_code, permissionType) => {
    const result = await pool.query(
      `SELECT ${permissionType} 
       FROM "UserPermissions"
       WHERE user_id = $1 AND module_code = $2`,
      [user_id, module_code]
    );

    if (result.rows.length === 0) return false;

    return result.rows[0][permissionType] === true;
  },
};
