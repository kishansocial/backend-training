module.exports = ({ permissionModuleRepo }) => {
  return async function createPermissionModule(data) {
    const exists = await permissionModuleRepo.findByModuleCode(
      data.module_code
    );
    if (exists) throw new Error("Module code already exists");

    return await permissionModuleRepo.createPermissionModule(data);
  };
};
