module.exports = ({ userPermissionRepo }) => {
  return async function createUserPermission(data) {
    const exists = await userPermissionRepo.findUserPermission(
      data.user_id,
      data.module_code
    );

    if (exists) throw new Error("User already has permission for this module");

    return await userPermissionRepo.createUserPermission(data);
  };
};
