const importController = require("../controller/importController");
const upload = require("../middlewares/upload");

const router = require("express").Router();

router.post(
  "/uploadData",
  importController.upload,
  importController.setAllData
);

router.get("/downloadExcel", importController.exportData);

module.exports = router;
