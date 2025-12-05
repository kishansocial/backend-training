module.exports = ({ permissionModuleRepo }) => {
  return async function deletePermissionModule(id) {
    await permissionModuleRepo.deletePermissionModule(id);
  };
};
