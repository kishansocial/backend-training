const db = require("../config/db");

// CREATE ITEM (version = 1)
module.exports = {
  createItem: async (data) => {
    // console.log(data, "ertgf");
    const sql = `
    INSERT INTO "Items" 
      (item_code, description, item_pictures, length, breadth, height, version, created_by ,"createdAt","updatedAt")
    VALUES 
      ($1, $2, $3, $4, $5, $6, 1, $7,$8,$9)
    RETURNING *;
  `;

    const values = [
      data.item_code,
      data.description,
      JSON.stringify(data.item_pictures || []),
      data.length,
      data.breadth,
      data.height,
      data.created_by,
      data.createdAt,
      data.updatedAt,
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  },
  // GET LATEST VERSION OF ITEM
  getLatestItem: async (itemCode) => {
    const sql = `
    SELECT *
    FROM "Items"
    WHERE item_code = $1
    ORDER BY version DESC
    LIMIT 1;
  `;
    const result = await db.query(sql, [itemCode]);
    return result.rows[0];
  },

  // CREATE NEW VERSION (update item)
  createNewVersion: async (data) => {
    const sql = `
    INSERT INTO "Items" 
      (item_code, description, item_pictures, length, breadth, height, version, created_by,"createdAt","updatedAt")
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10)
    RETURNING *;
  `;

    const values = [
      data.item_code,
      data.description,
      JSON.stringify(data.item_pictures),
      data.length,
      data.breadth,
      data.height,
      data.version,
      data.created_by,
      data.createdAt,
      data.updatedAt,
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  },
};
