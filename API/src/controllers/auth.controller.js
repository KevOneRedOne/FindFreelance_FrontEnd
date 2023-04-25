const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Freelancer = require('../models/freelance.model');
const Company = require('../models/company.model');
const Mail = require('../services/mail.service');

/*
    * @route   POST API.FindFreelance/v1/auth/register/freelancer
    * @desc    Register an user and new freelancer
    * @access  Public 
*/
exports.register_Freelancer = async (req, res, next) => {
    if (await User.findOne({ email: req.body.user.email })) {
      return res.status(400).send({ message: 'Email already exists', auth : false, token: null });
    }
    if (await User.findOne({ phoneNumber: req.body.user.phoneNumber })) {
      return res.status(400).send({ message: 'Phone number already exists', auth : false, token: null });
    }

    const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
    const newUser = new User({
      email: req.body.user.email,
      password: hashedPassword,
      lastName: req.body.user.lastName,
      firstName: req.body.user.firstName,
      address: req.body.user.address,
      phoneNumber: req.body.user.phoneNumber,
      isAdmin: false,
      isFreelancer: true,
      isCompany: false,
      Company: null,
      Freelancer: null
    });
    const newFreelancer = new Freelancer({
      user: newUser._id,
      socialReason: req.body.freelance.socialReason,
      socialStatus: req.body.freelance.socialStatus,
      dailyRate: req.body.freelance.dailyRate,
      yearsOfExperience: req.body.freelance.yearsOfExperience,
      skills: null,
      jobs: null
    });
  
    try {
      await newFreelancer.save();
      newUser.Freelancer = newFreelancer._id;
      await newUser.save();
  
      const userToken = jwt.sign({
        id: newUser._id,
        isAdmin: newUser.isAdmin,
        isFreelancer: newUser.isFreelancer,
        isCompany: newUser.isCompany || false
      }, process.env.SECRET_KEY);
  
      Mail.SendMail(newUser.email, 'Bienvenue sur FindFreelance', 'Bienvenue sur FindFreelance, votre compte a bien été créé !');
      res.status(201).send({
        message: 'User and Freelancer created successfully',
        auth: true,
        token: userToken
      });
    } catch (error) {
      res.status(500).send({
        message: 'Error while creating user and freelancer : ' + error,
        auth: false,
        token: null
      });
    }
  };

/*
    * @route   POST API.FindFreelance/v1/auth/register/user_inCompany
    * @desc    Register an user in a company and new company
    * @access  Public
*/
exports.register_User_inCompany = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.user.email });
    const numberExists = await User.findOne({ phoneNumber: req.body.user.phoneNumber});
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
    const newUser = new User({
        email: req.body.user.email,
        password: hashedPassword,
        lastName: req.body.user.lastName,
        firstName: req.body.user.firstName,
        address: req.body.user.address,
        phoneNumber: req.body.user.phoneNumber,
        isAdmin: false,
        isFreelancer: false,
        isCompany: true,
        Company: null,
        Freelancer: null,
    });
    const newCompany = new Company({
        users: newUser._id,
        socialReason: req.body.company.socialReason,
        socialStatus: req.body.company.socialStatus,
        socialCapital: req.body.company.socialCapital,
        siret: req.body.company.siret,
        address: req.body.company.address,
        missions: null,
    });

    if (emailExists) return res.status(400).send({ message: 'Email already exists', auth : false, token: null });
    if (numberExists) return res.status(400).send({ message: 'Phone number already exists', auth : false, token: null });

    const company = await Company.findOne({siret: req.body.company.siret});
    if (company) {
        newUser.Company = company._id;
        await newUser.save();
        const userToken = jwt.sign({
            id : newUser._id,
            isAdmin : newUser.isAdmin,
            isFreelancer : newUser.isFreelancer,
            isCompany : newUser.isCompany,
        }, process.env.SECRET_KEY);
        return res.status(201).send({ 
            message: 'User created successfully and added to an existing company', 
            auth : true, 
            token: userToken 
        });
    } else {
        await newCompany.save();
        newUser.Company = newCompany._id;
        await newUser.save();
        const userToken = jwt.sign({
            id : newUser._id,
            isAdmin : newUser.isAdmin,
            isFreelancer : newUser.isFreelancer,
            isCompany : newUser.isCompany,
        }, process.env.SECRET_KEY);
        Mail.SendMail(newUser.email, 'Bienvenue sur FindFreelance', 'Bienvenue sur FindFreelance, votre compte a bien été créé !');
        return res.status(201).send({
            message: 'User and Company created successfully', 
            auth : true, 
            token: userToken 
        });
    }
};

/*
    * @route   POST API.FindFreelance/v1/auth/login
    * @desc    Login an user
    * @access  Public
    * @body    email, password
*/
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user){
            return res.status(404).send({ 
                message: 'User not found.Please check your email.', 
                auth : false, 
                token: null 
            });
        }
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordIsValid){
            return res.status(401).send({ 
                message: 'Invalid password. Please check your password.', 
                auth : false, 
                token: null 
            });
        }
        const userToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin,
            isFreelancer : user.isFreelancer,
            isCompany : user.isCompany,
        }, process.env.SECRET_KEY);
        res.status(200).send({
            message: 'User logged successfully !',
            auth: true,
            token: userToken
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while logging in : ' + error,
            auth: false,
            token: null
        });
    }
};

/*
    * @route   GET API.FindFreelance/v1/auth/admin/login
    * @desc    Login as admin
    * @access  Public
    * @body    email, password
*/
exports.loginAsAdmin = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).send({
                message: 'User not found. Please check your email.',
                auth: false,
                token: null
            });
        }
        if (!user.isAdmin) {
            return res.status(401).send({
                message: 'You are not authorized to access this page. ',
                auth: false,
                token: null
            });       
        }
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: 'Invalid password.',
                auth: false,
                token: null
            });
        }
        const userToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin,
        }, process.env.SECRET_KEY);
        res.status(200).send({
            message: 'User authenticated successfully !',
            auth: true,
            token: userToken
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while authenticating user : ' + error,
            auth: false,
            token: null
        });
    }
};

/*
    * @route   GET API.FindFreelance/v1/auth/user/logout
    * @desc    Logout an user
    * @access  Private
    * @body    token
*/
exports.logout = async (req, res) => {
    try {
        //TODO: implement Blacklist
        req.userToken = null;
        res.status(200).send({
            message: 'User logged out successfully !',
            auth: false,
            token: null
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while logging out',
            auth: false,
            token: null
        });
    }
};

/*
    * @route   PUT API.FindFreelance/v1/auth/user/reset_password
    * @desc    Reset password
    * @access  Private
    * @body    token, password
*/
exports.password_reset = async (req, res) => {
    try {
        const user = await User.findById(req.userToken.id);
        if (!user){
            return res.status(404).send({ 
                message: 'User not found.', 
                auth : false, 
                token: null 
            });
        }
        const passwordIsValid = await bcrypt.compare(req.body.newPassword, user.password);
        if (passwordIsValid){
            return res.status(401).send({ 
                message: 'Invalid password. Please check your password.', 
                auth : false, 
                token: null 
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        const userToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin,
            isFreelancer : user.isFreelancer,
            isCompany : user.isCompany,
        }, process.env.SECRET_KEY);
        res.status(200).send({
            message: 'User password reset successfully !',
            auth: true,
            token: userToken
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while resetting password : ' + error,
            auth: false,
            token: null
        });
    }
};

/*
    * @route   PUT API.FindFreelance/v1/auth/user/forgot_password
    * @desc    Forgot password
    * @access  Private
    * @body    email
*/
//TODO: implement forgot password with mailsender
exports.password_forgot = async (req, res) => {


};
 