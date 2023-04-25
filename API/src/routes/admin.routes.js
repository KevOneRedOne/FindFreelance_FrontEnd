const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin.controller');
const freelanceController = require('../controllers/freelance.controller');
const companyController = require('../controllers/company.controller');
const missionController = require('../controllers/mission.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyUsers').verifyAdmin;

//-------------------- ADMIN --------------------
router.get('/all', verifyToken, verifyAdmin, adminController.getAllAdmins);
router.get('/one/:id', verifyToken, verifyAdmin, adminController.getOneAdmin);
router.put('/update/one/:id', verifyToken, verifyAdmin, adminController.updateOneAdmin);
router.delete('/delete/one/:id', verifyToken, verifyAdmin, adminController.deleteAdmin);

// -------------------- FREELANCER -------------------- //
router.put('/freelancer/update/:id', verifyToken, verifyAdmin, freelanceController.updateFreelanceByAdmin);
router.delete('/freelancer/delete/:id', verifyToken, verifyAdmin, freelanceController.deleteFreelanceByAdmin);

// -------------------- COMPANY -------------------- //
router.put('/company/update/:id', verifyToken, verifyAdmin, companyController.updateOneCompanyAdmin);
router.delete('/company/delete/:id', verifyToken, verifyAdmin, companyController.deleteOneCompanyAdmin);

// -------------------- MISSION --------------------
router.get('/mission/all', verifyToken, verifyAdmin, missionController.getAllMissions);
router.get('/mission/:id', verifyToken, verifyAdmin, missionController.getOneMission);
router.put('/mission/update/:id', verifyToken, verifyAdmin, missionController.updateOneMission);
router.delete('/mission/delete/:id', verifyToken, verifyAdmin, missionController.deleteOneMission);


module.exports = router;


// //-------------------- PROPOSAL --------------------
// router.get('/admin/proposals', verifyToken, verifyAdmin, adminController.getAllProposals);
// router.get('/admin/proposal/:id', verifyToken, verifyAdmin, adminController.getOneProposal);

