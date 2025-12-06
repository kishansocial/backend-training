module.exports = ({ itemDataRepo }) => {
  return async function createItemm(data, userId) {
    // console.log( itemDataRepo, data, userId);
    if (!data.item_code) {
      throw new Error("Item code require");
    }
    const latest = await itemDataRepo.getLatestItem(data.item_code);
    if (latest) throw new Error("Item Already there");

    await itemDataRepo.createItem({ ...data, created_by: userId });
  };
};
