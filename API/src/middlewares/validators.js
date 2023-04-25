const { body, validationResult } = require('express-validator');

exports.checkIdentity = [
    body('firstname').notEmpty().withMessage('Firstname is required'),
    body('lastname').notEmpty().withMessage('Lastname is required')
];

exports.checkEmail = [
    body('email')
    .notEmpty()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage('Email is required')
];

exports.checkPassword = [
    body('password')
    .notEmpty()
    .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/)
    .withMessage('Password is required')
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors:errors.array()
      })
    }
  
    next();  
};
