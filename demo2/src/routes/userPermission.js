const controller = require("../controller/userPermission");
const express = require("express");
const router = express.Router();
const isAdmin = require("../utils/isAdmin");

const moduleExist = require("../utils/modulesExist");
const userExist = require("../utils/userExist");


// const checkPermission = require("../utils/checkPermission");

router.post("/add/", isAdmin, moduleExist, userExist, controller.create);
router.put("/update/:id", isAdmin, moduleExist, userExist, controller.update);

module.exports = router;
