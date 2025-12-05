const express = require("express");

const router = express.Router();
const controller = require("../controller/permissionModule");
const isAdmin = require("../utils/isAdmin");
const isIdExist = require("../utils/permissionModules");

router.post("/create", isAdmin, controller.create);
router.put("/update/:id", isAdmin, isIdExist,controller.update);
router.delete("/delete/:id", isAdmin,isIdExist, controller.delete);

module.exports = router;
