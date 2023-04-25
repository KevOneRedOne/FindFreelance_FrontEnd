const Freelance = require('../models/freelance.model');
const User = require('../models/user.model');

/*
    * @route GET API.FindFreelance/v1/user/freelance/all
    * @desc Get all freelances
    * @access Private
*/
exports.getAllFreelances = async (req, res) => {
    try {
        const allFreelances = await Freelance.find();
        if (!allFreelances) {
            return res.status(404).send({
                message: "No freelance found.",
                auth: false,
                data: null
            });
        }
        res.status(200).send({
            message: "Freelances retrieved successfully.",
            auth: true,
            data: allFreelances
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving freelances : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route GET API.FindFreelance/v1/user/freelance/:id
    * @desc Get one freelance
    * @access Private
    * @param id
*/
exports.getOneFreelance = async (req, res) => {
    try {
        const freelance = await Freelance.findById(req.params.id);
        if (!freelance) {
            return res.status(404).send({
                message: "No freelance found.",
                auth: false,
                data: null
            });
        }
        res.status(200).send({
            message: "Freelance retrieved successfully.",
            auth: true,
            data: freelance
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving freelance : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route PUT API.FindFreelance/v1/user/freelance/update/:id
    * @desc Update freelance information
    * @access Private (Freelance)
*/  
exports.updateFreelance = async (req, res) => {
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
            if (!user.isFreelancer) {
                return res.status(404).send({
                    message: "No freelance user.",
                    auth: false,
                    data: null
                });
            } 
            Freelance.findByIdAndUpdate(user.Freelancer._id).then((freelance) => {
                if (!freelance) {
                    return res.status(404).send({
                        message: "No freelance found.",
                        auth: false,
                        data: null
                    });
                }
                freelance.socialReason = req.body.socialReason;
                freelance.socialStatus = req.body.socialStatus;
                freelance.dailyRate = req.body.dailyRate;
                freelance.siret = req.body.siret;
                freelance.yearsOfExperience = req.body.yearsOfExperience;
                freelance.skills = [
                    {
                        skill:  req.body.skillId,
                    }
                ];
                freelance.jobs = [
                    {
                        job:  req.body.jobId,
                    }
                ];
                freelance.save();
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
            message: "Error while updating freelance : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route DELETE API.FindFreelance/v1/user/freelance/delete/:id
    * @desc Delete one freelance
    * @access Private (Freelance)
*/
exports.deleteFreelance = async (req, res) => {
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
            if (!user.isFreelancer) {
                return res.status(404).send({
                    message: "No freelance user.",
                    auth: false,
                    data: null
                });
            } 
            Freelance.findByIdAndDelete(user.Freelancer._id).then((freelance) => {
                if (!freelance) {
                    return res.status(404).send({
                        message: "No freelance found.",
                        auth: false,
                        data: null
                    });
                }
                res.status(200).send({
                    message: "Freelance deleted successfully.",
                    auth: true,
                    data: freelance
                });
            }
        );
    });

    } catch (error) {
        res.status(500).send({
            message: "Error while deleting freelance : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route POST API.FindFreelance/v1/user/freelancer/searchfreelances
    * @desc Search freelances by lastname, firstname, city, job, skill
    * @access Private
*/
exports.searchFreelances = async (req, res) => {
    try {
        await User.find({
            $or: [
                { firstName: { $regex: req.body.search, $options: "i" } },
                { lastName: { $regex: req.body.search, $options: "i" } },
                { "address.city": { $regex: req.body.search, $options: "i" } },
            ]
        }).then((User) => {
            if (!User) {
                return res.status(404).send({
                    message: "No User found.",
                    auth: false,
                    data: null
                });
            }
            Freelance.find({
                $or: [
                    { "skills.skill": { $regex: req.body.search, $options: "i" } },
                    { "jobs.job": { $regex: req.body.search, $options: "i" } }
                ]
            }).then((freelances) => {
                if (!freelances) {
                    return res.status(404).send({
                        message: "No freelances found.",
                        auth: false,
                        data: null
                    });
                }
            });

            res.status(200).send({
                message: "Freelances retrieved successfully.",
                auth: true,
                data: freelances
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while retrieving freelances : " + error,
            auth: false,
            data: null
        });
    }
};

        // const freelances = await User.find({
        //     isCompany: false,
        //     $or: [
        //         { firstName: { $regex: req.body.search, $options: "i" } },
        //         { lastName: { $regex: req.body.search, $options: "i" } },
        //         { "address.city": { $regex: req.body.search, $options: "i" } },
        //         { "skills.skill": { $regex: req.body.search, $options: "i" } },
        //         { "jobs.job": { $regex: req.body.search, $options: "i" } }
        //     ]
        // });
        // if (!freelances) {
        //     return res.status(404).send({
        //         message: "No freelances found.",
        //         auth: false,
        //         data: null
        //     });
        // }
        // res.status(200).send({
        //     message: "Freelances retrieved successfully.",
        //     auth: true,
        //     data: freelances
        // });
//     } catch (error) {
//         res.status(500).send({
//             message: "Error while retrieving freelances : " + error,
//             auth: false,
//             data: null
//         });
//     }
// };







//-------------------- ADMIN --------------------//

/*
    * @route PUT API.FindFreelance/v1/admin/freelance/update/:id
    * @desc Update freelance information
    * @access Private (Admin)
    * @param id
*/
exports.updateFreelanceByAdmin = async (req, res) => {
    try {
        await Freelance.findByIdAndUpdate(req.params.id).then((freelance) => {
            if (!freelance) {
                return res.status(404).send({
                    message: "No freelance found.",
                    auth: false,
                    data: null
                });
            }
            freelance.socialReason = req.body.socialReason;
            freelance.socialStatus = req.body.socialStatus;
            freelance.dailyRate = req.body.dailyRate;
            freelance.siret = req.body.siret;
            freelance.yearsOfExperience = req.body.yearsOfExperience;
            freelance.skills = [
                {
                    skill:  req.body.skillId,
                }
            ];
            freelance.jobs = [
                {
                    job:  req.body.jobId,
                }
            ];
            freelance.save();
            res.status(200).send({
                message: "Company updated successfully.",
                auth: true,
                data: company
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating freelance : " + error,
            auth: false,
            data: null
        });
    }
};

/*
    * @route DELETE API.FindFreelance/v1/admin/freelance/delete/:id
    * @desc Delete one freelance
    * @access Private (Admin)
    * @param id
*/
exports.deleteFreelanceByAdmin = async (req, res) => {
    try {
        await Freelance.findByIdAndDelete(req.params.id).then((freelance) => {
            if (!freelance) {
                return res.status(404).send({
                    message: "No freelance found.",
                    auth: false,
                    data: null
                });
            }
            res.status(200).send({
                message: "Freelance deleted successfully.",
                auth: true,
                data: freelance
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while deleting freelance : " + error,
            auth: false,
            data: null
        });
    }
};
