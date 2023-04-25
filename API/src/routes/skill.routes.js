const express = require("express");

const router = express.Router();
const skillController = require("../controllers/skill.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyUsers").verifyAdmin;

router.post("/admin/newskill", verifyToken, verifyAdmin, skillController.createSkill);
router.get("/all", skillController.getAllSkills);
router.get("/:id", skillController.getOneSkill);
router.put("/admin/update/:id", verifyToken, verifyAdmin, skillController.updateOneSkill);
router.delete("/admin/delete/:id", verifyToken, verifyAdmin, skillController.deleteOneSkill);

module.exports = router;