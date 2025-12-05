module.exports = ({ userRepo }) => {
  return async function softDelete(id, deletedBy) {
    await userRepo.softDelete(id, deletedBy);
  };
};
