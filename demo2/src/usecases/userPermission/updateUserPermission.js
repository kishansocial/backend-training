module.exports = ({ userPermissionRepo }) => {
  return async function updateUserPermission(id, data) {
    const exists = await userPermissionRepo.findById(id);
    if (!exists) throw new Error("Permission not found");

    await userPermissionRepo.updateUserPermission(id, data);
  };
};
