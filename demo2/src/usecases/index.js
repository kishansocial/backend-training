const userRepo = require("../data/user");
const permissionModuleRepo=require("../data/permissionModule")
const userPermissionRepo=require("../data/userPermission")

const passwordUtil = require("../utils/password");


// USER UseCases
const registerUser = require("./user/registerUser");
const loginUser = require("./user/loginUser");
const getUserById = require("./user/getUserById");
const updatePassword = require("./user/updatePassword");
const updateProfile = require("./user/updateProfile");
const softDeleteUser = require("./user/softDeleteUser");

// PERMISSION MODULE UseCases
const createPermissionModule = require("./permissionModule/createPermissionModule");
const updatePermissionModule = require("./permissionModule/updatePermissionModule");
const deletePermissionModule = require("./permissionModule/deletePermissionModule");


const createUserPermission = require("./userPermission/createUserPermission");
const updateUserPermission = require("./userPermission/updateUserPermission");

module.exports = {
  // USER UC
  registerUserUC: registerUser({ userRepo, passwordUtil }),
  loginUserUC: loginUser({ userRepo, passwordUtil }),
  getUserByIdUC: getUserById({ userRepo }),
  updatePasswordUC: updatePassword({ userRepo, passwordUtil }),
  updateProfileUC: updateProfile({ userRepo }),
  softDeleteUserUC: softDeleteUser({ userRepo }),

  // PERMISSION MODULE UC
  createPermissionModuleUC: createPermissionModule({ permissionModuleRepo }),
  updatePermissionModuleUC: updatePermissionModule({ permissionModuleRepo }),
  deletePermissionModuleUC: deletePermissionModule({ permissionModuleRepo }),

  createUserPermissionUC: createUserPermission({ userPermissionRepo }),
  updateUserPermissionUC: updateUserPermission({ userPermissionRepo }),
};
