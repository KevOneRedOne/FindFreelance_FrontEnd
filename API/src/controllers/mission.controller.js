const Company = require("../models/company.model");

/*
    * @route POST API.FindFreelance/v1/mission/newmission
    * @desc Create a new mission
    * @access Private (Company) 
*/
exports.createMission = async(req, res) => {
    try {
        Company.findById(req.userToken.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while creating mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No company found.",
                    auth: false,
                    data: null,
                });
            }
            company.missions.push({
                title: req.body.title,
                description: req.body.description,
                totalAmount: req.body.totalAmount,
                period:{
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                },
                job : req.body.jobId,
                skills: [
                    {
                        skill: req.body.skillId,
                    }
                ],
                statusMission: req.body.statusMission
            });
            company.save((err) => {
                if (err) {
                    res.status(500).send({
                        message: "Error while creating mission : " + err,
                        auth: false,
                        data: null,
                    });
                }
                res.status(200).send({
                    message: "Mission created successfully.",
                    auth: true,
                    data: company.missions,
                });
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while creating mission : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
 * @route GET API.FindFreelance/v1/mission/all
 * @desc Get all missions 
 * @access Private (Company)
 */
exports.getAllMissions = async (req, res) => {
    try {
        Company.findById(req.userToken.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while retrieving missions : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No missions found.",
                    auth: false,
                    data: null,
                });
            }
            res.status(200).send({
                message: "Missions retrieved successfully.",
                auth: true,
                data: company.missions,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving missions : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
    * @route GET API.FindFreelance/v1/mission/:id
    * @desc Get one mission
    * @access Private (Company)
    * @param id
*/
exports.getOneMission = async (req, res) => {
    try {
        Company.findById(req.userToken.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while retrieving mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No mission found.",
                    auth: false,
                    data: null,
                });
            }
            res.status(200).send({
                message: "Mission retrieved successfully.",
                auth: true,
                data: company.missions.id(req.params.id),
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving mission : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
    * @route PUT API.FindFreelance/v1/mission/update/:id
    * @desc Update one mission
    * @access Private (Company)
    * @param id
*/
exports.updateOneMission = async(req, res) => {
    try {
        Company.findById(req.userToken.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while updating mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No mission found.",
                    auth: false,
                    data: null,
                });
            }
            const mission = company.missions.id(req.params.id);
            mission.title = req.body.title;
            mission.description = req.body.description;
            mission.totalAmount = req.body.skills;
            mission.period.startDate = req.body.period.startDate;
            mission.period.endDate = req.body.period.endtDate;
            mission.job = req.body.job;
            mission.skills = req.body.skills;
            mission.statusMission = req.body.status;
            mission.save();
            company.save();
            res.status(200).send({
                message: "Mission updated successfully.",
                auth: true,
                data: company.missions.id(req.params.id),
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating mission : " + error,
            auth: false,
            data: null,
        });
    }

};

/*
    * @route DELETE API.FindFreelance/v1/mission/delete/:id
    * @desc Delete one mission
    * @access Private (Company)
    * @param id
*/
exports.deleteOneMission = async(req, res) => {
    try {
        Company.findById(req.userToken.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while deleting mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No mission found.",
                    auth: false,
                    data: null,
                });
            }
            company.missions.id(req.params.id).remove();
            company.save();
            res.status(200).send({
                message: "Mission deleted successfully.",
                auth: true,
                data: company.missions,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while deleting mission : " + error,
            auth: false,
            data: null,
        });
    }
};


// -------------------------- ADMIN -------------------------- //

/*
    * @route GET API.FindFreelance/v1/admin/mission/all
    * @desc Get all missions
    * @access Private (Admin)
*/
exports.getAllMissionsAdmin = async (req, res) => {
    try {
        Company.find({}, (err, companies) => {
            if (err) {
                res.status(500).send({
                    message: "Error while retrieving missions : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!companies) {
                res.status(404).send({
                    message: "No missions found.",
                    auth: false,
                    data: null,
                });
            }
            
            let missions = [];
            companies.forEach(company => {
                company.missions.forEach(mission => {
                    missions.push(company, mission);
                });
            });

            res.status(200).send({
                message: "Missions retrieved successfully.",
                auth: true,
                data: missions,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving missions : " + error,
            auth: false,
            data: null,
        });
    }
}

/*
    * @route GET API.FindFreelance/v1/admin/mission/:id
    * @desc Get one mission
    * @access Private (Admin)
    * @param id
*/
exports.getOneMissionAdmin = async (req, res) => {
    try {
        Company.findById(req.params.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while retrieving mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No mission found.",
                    auth: false,
                    data: null,
                });
            }
            res.status(200).send({
                message: "Mission retrieved successfully.",
                auth: true,
                data: company.missions.id(req.params.id),
            });
        });

    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving mission : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
    * @route PUT API.FindFreelance/v1/admin/mission/update/:id
    * @desc Update one mission
    * @access Private (Admin)
    * @param id
*/
exports.updateOneMissionAdmin = async (req, res) => {
    try {
        Company.findById(req.params.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while updating mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No mission found.",
                    auth: false,
                    data: null,
                });
            }
            const mission = company.missions.id(req.params.id);
            mission.title = req.body.title;
            mission.description = req.body.description;
            mission.totalAmount = req.body.skills;
            mission.period.startDate = req.body.period.startDate;
            mission.period.endDate = req.body.period.endtDate;
            mission.job = req.body.job;
            mission.skills = req.body.skills;
            mission.statusMission = req.body.status;
            mission.save();
            company.save();
            res.status(200).send({
                message: "Mission updated successfully.",
                auth: true,
                data: company.missions.id(req.params.id),
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating mission : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
    * @route DELETE API.FindFreelance/v1/admin/mission/delete/:id
    * @desc Delete one mission
    * @access Private (Admin)
    * @param id
*/
exports.deleteOneMissionAdmin = async (req, res) => {
    try {
        Company.findById(req.params.id, (err, company) => {
            if (err) {
                res.status(500).send({
                    message: "Error while deleting mission : " + err,
                    auth: false,
                    data: null,
                });
            }
            if (!company) {
                res.status(404).send({
                    message: "No mission found.",
                    auth: false,
                    data: null,
                });
            }
            company.missions.id(req.params.id).remove();
            company.save();
            res.status(200).send({
                message: "Mission deleted successfully.",
                auth: true,
                data: company.missions,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while deleting mission : " + error,
            auth: false,
            data: null,
        });
    }
};