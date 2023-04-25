const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    lastName : {
        type: String, 
        required: true, 
        trim: true,
        uppercase: true,
        minLenght: 2,
        maxLenght: 50
    },
    firstName : {
        type: String, 
        required: true, 
        trim: true,
        minLenght: 2,
        maxLenght: 50,
    },
    address : {
        street : {type: String, required: true, trim: true},
        city : {type: String, required: true, trim: true},
        zipCode : {type: String, required: true, trim: true},
        country : {
            type: String, 
            required: false, 
            trim: true,
            default: 'France',
        },
    },
    phoneNumber : {
        type: String,
        required: false,
        unique: [true, 'Phone number already exists'],
    },
    email : {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
    }, 
    password : {type: String, required: true, trim: true},
    isAdmin: {type: Boolean, default: false},
    isFreelancer: {type: Boolean, default: false},
    isCompany: {type: Boolean, default: false},
    Freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: false,
    },
    Company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false,
    },
});

// TODO: add regex to validate email
// TODO: express-validator

module.exports = mongoose.model('User', UserSchema);