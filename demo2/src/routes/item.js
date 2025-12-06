const router = require("express").Router();
const controller = require("../controller/item");
const authenticate = require("../utils/auth");
const { upload, uploadToMinio } = require("../utils/minioUpload");

router.post(
  "/create",
  authenticate,
  upload.array("item_pictures"),
  uploadToMinio,
  controller.createItem
);
router.get("/get/:item_code", authenticate, controller.getItem);
router.put(
  "/update/:item_code",
  authenticate,
  upload.array("item_pictures"),
  uploadToMinio,
  controller.updateItem
);

module.exports = router;
