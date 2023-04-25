const Company = require("../models/company.model");
const User = require("../models/user.model");

/*
    * @route GET API.FindFreelance/v1/user/company/all
    * @desc Get all companies
    * @access Private 
*/
exports.getAllCompanies = async (req, res) => {
    try {
        const allCompanies = await Company.find();
        if (!allCompanies) {
            return res.status(404).send({
                message: "No company found.",
                auth: false,
                data: null
            });
        }
        res.status(200).send({
            message: "Companies retrieved successfully.",
            auth: true,
            data: allCompanies
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving companies : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route GET API.FindFreelance/v1/user/company/:id
    * @desc Get one company
    * @access Private
    * @param id
*/
exports.getOneCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send({
                message: "No company found.",
                auth: false,
                data: null
            });
        }
        res.status(200).send({
            message: "Company retrieved successfully.",
            auth: true,
            data: company
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving company : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route PUT API.FindFreelance/v1/user/company/update/:id
    * @desc Update one company
    * @access Private (Company)
*/
exports.updateOneCompany = async (req, res) => {
    try {
        await User.findById(req.userToken.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: "No user found.",
                        auth: false,
                        data: null
                    });
                }
                if (!user.isCompany) {
                    return res.status(404).send({
                        message: "No company user.",
                        auth: false,
                        data: null
                    });
                } 
                Company.findByIdAndUpdate(user.Company._id).then((company) => {
                    if (!company) {
                        return res.status(404).send({
                            message: "No company found.",
                            auth: false,
                            data: null
                        });
                    }
                    company.socialReason = req.body.socialReason;
                    company.socialStatus = req.body.socialStatus;
                    company.socialCapital = req.body.socialCapital;
                    company.siret = req.body.siret;
                    company.address = {
                        street: req.body.address.street,
                        city: req.body.address.city,
                        zipCode: req.body.address.zipCode,
                        country: req.body.address.country
                    };
                    company.save();
                    res.status(200).send({
                        message: "Company updated successfully.",
                        auth: true,
                        data: company
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating company : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route DELETE API.FindFreelance/v1/user/company/delete/:id
    * @desc Delete one company
    * @access Private (Company)
*/
exports.deleteOneCompany = async (req, res) => {
    try {
        await User.findById(req.userToken.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: "No user found.",
                        auth: false,
                        data: null
                    });
                }
                if (!user.isCompany) {
                    return res.status(404).send({
                        message: "No company user.",
                        auth: false,
                        data: null
                    });
                } 
                Company.findByIdAndDelete(user.Company._id).then((company) => {
                    if (!company) {
                        return res.status(404).send({
                            message: "No company found.",
                            auth: false,
                            data: null
                        });
                    }
                    res.status(200).send({
                        message: "Company deleted successfully.",
                        auth: true,
                        data: company
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while deleting company : " + error,
            auth: false,
            data: null
        });
    }
};

// -------------------- ADMIN -------------------- //

/*
    * @route PUT API.FindFreelance/v1/admin/company/update/:id
    * @desc Update one company
    * @access Private (Admin)
    * @param id
*/
exports.updateOneCompanyAdmin = async (req, res) => {
    try {
        await Company.findByIdAndUpdate(req.params.id).then((company) => {
            if (!company) {
                return res.status(404).send({
                    message: "No company found.",
                    auth: false,
                    data: null
                });
            }
            company.socialReason = req.body.socialReason;
            company.socialStatus = req.body.socialStatus;
            company.socialCapital = req.body.socialCapital;
            company.siret = req.body.siret;
            company.address = {
                street: req.body.address.street,
                city: req.body.address.city,
                zipCode: req.body.address.zipCode,
                country: req.body.address.country
            };
            company.save();
            res.status(200).send({
                message: "Company updated successfully.",
                auth: true,
                data: company
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating company : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route DELETE API.FindFreelance/v1/admin/company/delete/:id
    * @desc Delete one company
    * @access Private (Admin)
    * @param id
*/
exports.deleteOneCompanyAdmin = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id).then((company) => {
            if (!company) {
                return res.status(404).send({
                    message: "No company found.",
                    auth: false,
                    data: null
                });
            }
            res.status(200).send({
                message: "Company deleted successfully.",
                auth: true,
                data: company
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while deleting company : " + error,
            auth: false,
            data: null
        });
    }
};


