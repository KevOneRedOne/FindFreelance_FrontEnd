const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");
const companyController = require("../controllers/company.controller");
const freelanceController = require("../controllers/freelance.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyUsers").verifyAdmin;
const verifyCompany = require("../middlewares/verifyUsers").verifyCompany;
const verifyFreelancer = require("../middlewares/verifyUsers").verifyFreelancer;

// -------------------- USER -------------------- //
router.get("/all", verifyToken, verifyAdmin, userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/admin/update/:id", verifyToken, verifyAdmin, userController.updateOneUser);
router.put("/myaccount/update", verifyToken, userController.update_myAccount);
router.delete("/admin/delete/:id", verifyToken, verifyAdmin, userController.deleteOneUser);
router.delete("/myaccount/delete", verifyToken, userController.delete_myAccount);

// -------------------- FREELANCER -------------------- //
router.get("/freelancer/all", verifyToken, freelanceController.getAllFreelances);
router.get("/freelancer/:id", verifyToken, freelanceController.getOneFreelance);
router.put("/freelancer/update/:id", verifyToken, verifyFreelancer, freelanceController.updateFreelance);
router.delete("/freelancer/delete/:id", verifyToken, verifyFreelancer, freelanceController.deleteFreelance);
router.get("/freelancer/searchfreelances", verifyToken, verifyCompany, freelanceController.searchFreelances);

// -------------------- COMPANY -------------------- //
router.get("/company/all", verifyToken, companyController.getAllCompanies);
router.get("/company/:id", verifyToken, companyController.getOneCompany);
router.put("/company/update/:id", verifyToken, verifyCompany, companyController.updateOneCompany);
router.delete("/company/delete/:id", verifyToken, verifyCompany, companyController.deleteOneCompany);
module.exports = router;

