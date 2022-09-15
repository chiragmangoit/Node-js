const peopleController = require("../controller/peopleController");
const upload = require("../middlewares/upload");

const router = require("express").Router();

router.post("/upload", peopleController.upload, peopleController.setIndicatorsData);
router.get("/indicators", peopleController.getIndicators);

module.exports = router;
