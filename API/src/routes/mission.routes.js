const express = require("express");

const router = express.Router();
const missionController = require('../controllers/mission.controller');
const verifyToken = require("../middlewares/verifyToken");
// const verifyAdmin = require("../middlewares/verifyUsers").verifyAdmin;
const verifyCompany = require("../middlewares/verifyUsers").verifyCompany;

router.post("/new", verifyToken, verifyCompany, missionController.createMission);
router.get("/all", verifyToken, verifyCompany, missionController.getAllMissions);
router.get("/:id", verifyToken, verifyCompany, missionController.getOneMission);
router.put("/update/:id", verifyToken, verifyCompany, missionController.updateOneMission);
router.delete("/delete/:id", verifyToken, verifyCompany, missionController.deleteOneMission);

module.exports = router;