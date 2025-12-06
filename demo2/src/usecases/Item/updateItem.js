const { DATE } = require("sequelize");

const updateItem =
  ({ itemDataRepo }) =>
  async (itemCode, payload, userId) => {
    // 1. Get latest version
    const latest = await itemDataRepo.getLatestItem(itemCode);
    if (!latest) throw new Error("Item not found");

    // 2. Build new version (only override provided fields)
    const newItem = {
      item_code: itemCode,
      description: payload.description ?? latest.description,
      item_pictures: payload.item_pictures ?? latest.item_pictures,
      length: payload.length ?? latest.length,
      breadth: payload.breadth ?? latest.breadth,
      height: payload.height ?? latest.height,
      version: latest.version + 1,
      created_by: userId,
      createdAt: latest.createdAt,
      updatedAt: new Date(Date.now() + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .replace(".000Z", "+05:30"),
    };

    // 3. Create new version row
    return await itemDataRepo.createNewVersion(newItem);
  };

module.exports = updateItem;
