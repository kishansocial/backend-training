const pool = require("../config/db");

module.exports = {
  // Find user by username (only non-deleted users)
  findByUsername: async (username) => {
    const result = await pool.query(
      `SELECT id, username, password, address1, address2, phone_number, created_at, 
              is_deleted, deleted_by, deleted_at, is_admin
       FROM "Users"
       WHERE username = $1 AND is_deleted = false`,
      [username]
    );
    return result.rows[0];
  },

  // Create a new user (all fields included)
  createUser: async (user) => {
    console.log(user);
    const {
      username,
      password,
      address1,
      address2,
      phone_number,
      created_at,
      is_deleted,
      deleted_by,
      deleted_at,
      is_admin,
      updated_at,
    } = user;

    const result = await pool.query(
      `INSERT INTO "Users"
        (username, password, address1, address2, phone_number, created_at, is_deleted, deleted_by, deleted_at, is_admin,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, username, password, address1, address2, phone_number, created_at, 
                 is_deleted, deleted_by, deleted_at, is_admin,updated_at`,
      [
        username,
        password,
        address1,
        address2,
        phone_number,
        created_at,
        is_deleted,
        deleted_by,
        deleted_at,
        is_admin,
        updated_at,
      ]
    );

    return result.rows[0];
  },

  // Find user by ID
  findById: async (id) => {
    // console.log("DFfdsfsdf");
    const result = await pool.query(
      `SELECT id, username, password, address1, address2, phone_number, created_at, 
              is_deleted, deleted_by, deleted_at, is_admin
       FROM "Users"
       WHERE id = $1 AND is_deleted = false`,
      [id]
    );
    return result.rows[0];
  },

  // Update user password
  updatePassword: async (id, password) => {
    await pool.query(
      `UPDATE "Users"
       SET password=$1 
       WHERE id=$2`,
      [password, id]
    );
  },

  // Update user profile
  updateProfile: async (id, data) => {
    const { username, address1, address2, phone_number, is_admin } = data;

    await pool.query(
      `UPDATE "Users"
       SET username=$1, address1=$2, address2=$3, phone_number=$4, is_admin=$5
       WHERE id=$6`,
      [username, address1, address2, phone_number, is_admin, id]
    );
  },

  // Soft delete user
  softDelete: async (id, deletedBy) => {
    await pool.query(
      `UPDATE "Users"
       SET is_deleted=true, deleted_by=$1, deleted_at=NOW() 
       WHERE id=$2`,
      [deletedBy, id]
    );
  },
  allSoftUsers: async () => {
    const result = await pool.query(
      `SELECT * FROM "Users" WHERE is_deleted = true`
    );
    return result.rows; // return array
  },

  // DELETE all soft-deleted users
  deleteSoftUsers: async () => {
    const result = await pool.query(
      `DELETE FROM "Users" 
       WHERE is_deleted = true
       RETURNING *`
    );
    return result.rows; // return deleted items if needed
  },
};
