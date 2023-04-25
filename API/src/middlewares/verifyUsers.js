exports.verifyCompany = (req, res, next) => {
    if(!req.userToken.isCompany){
        return res.status(401).send({
            message: "Unauthorized, must be company",
            auth: false,
        });
    }
    next(); // next middleware 
};

exports.verifyAdmin = (req, res, next) => {
    if(!req.userToken.isAdmin){
        return res.status(401).send({
            message: "Unauthorized, must be admin",
            auth: false,
        });
    }
    next(); // next middleware 
};

exports.verifyFreelancer = (req, res, next) => {
    if(!req.userToken.isFreelancer){
        return res.status(401).send({
            message: "Unauthorized, must be freelancer",
            auth: false,
        });
    }
    next(); // next middleware 
};

