const express = require("express");

const router = express.Router();
const authRouter = require("./auth.routes");
const adminRouter = require("./admin.routes");
const userRouter = require("./user.routes");
const jobRouter = require("./job.routes");
const skillRouter = require("./skill.routes");
const missionRouter = require("./mission.routes");
// const proposalRouter = require("./proposal.routes");

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.use('/job', jobRouter);
router.use('/skill', skillRouter);
router.use('/mission', missionRouter);
// router.use('/proposal', proposalRouter);


module.exports = router;
