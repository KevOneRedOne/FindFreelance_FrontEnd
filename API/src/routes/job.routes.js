const express = require("express");

const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyUsers").verifyAdmin;

router.post("/admin/newjob", verifyToken, verifyAdmin, jobController.createJob);
router.get("/all", jobController.getAllJobs);
router.get("/:id", jobController.getOneJob);
router.put("/admin/update/:id", verifyToken, verifyAdmin, jobController.updateOneJob);
router.delete("/admin/delete/:id", verifyToken, verifyAdmin, jobController.deleteOneJob);

module.exports = router;

