module.exports = ({ permissionModuleRepo }) => {
  return async function updatePermissionModule(id, data) {
    await permissionModuleRepo.updatePermissionModule(id, data);
  };
};
