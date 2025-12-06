module.exports =
  ({ itemDataRepo }) =>
  async (itemCode) => {
    return await itemDataRepo.getLatestItem(itemCode);
  };
