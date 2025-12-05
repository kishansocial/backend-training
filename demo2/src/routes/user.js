const express = require("express");
const controller = require("../controller/user");
const { authenticate } = require("../utils/auth");

const checkPermission = require("../utils/checkPermission");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get(
  "/getUser/:id",
  authenticate,
  checkPermission("can_view"),
  controller.getById
);
router.put(
  "/password/:id",
  authenticate,
  checkPermission("can_update"),
  controller.updatePassword
);
router.put(
  "/profile/:id",
  authenticate,
  checkPermission("can_update"),
  controller.updateProfile
);
router.delete(
  "/delete/:id",
  authenticate,
  checkPermission("can_delete"),
  controller.softDelete
);

module.exports = router;
