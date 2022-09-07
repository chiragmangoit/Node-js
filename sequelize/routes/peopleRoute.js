const peopleController = require("../controller/peopleController");

const router = require("express").Router();

router.post("/addPeople", peopleController.addPeople);
router.get("/getPeople", peopleController.getAllPeoples);
router.post("/:id", peopleController.getPeople);
router.delete("/:id", peopleController.deletePeople);
router.put("/:id", peopleController.updatePeople);

module.exports = router;
