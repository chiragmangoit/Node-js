const peopleController = require("../controller/peopleController");
const upload = require("../middlewares/upload");

const router = require("express").Router();

router.post(
  "/uploadData",
  peopleController.upload,
  peopleController.setAllData
);
// router.post(
//   "/uploadQuestionsData",
//   peopleController.upload,
//   peopleController.testData
// );

// router.post("/uploadIndicatorData", peopleController.upload, peopleController.setIndicatorsData);
// router.post("/uploadTaxonomyData", peopleController.upload, peopleController.setTaxanomyData);

module.exports = router;
