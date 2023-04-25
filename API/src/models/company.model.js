const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    socialReason: {type: String, required: true, unique: true, trim: true},
    socialStatus: {
        type: String,
        enum: ['SARL', 'SA', 'SAS', 'SNC', 'SCA', 'SCOP', 'EURL'],
        required: true, 
        trim: true
    },
    socialCapital: {type: Number, required: false, default: 1},
    siret: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        maxlength: 14,
        minlength: 9
    },
    address: {
        street: {type: String, required: true, trim: true},
        zipCode: {type: String, required: true, trim: true},
        city: {type: String, required: true, trim: true},
        country: {type: String, required: false, trim: true, default: 'France'},
    },
    missions: [{
        title : {type: String, required: true, trim: true},
        description : {type: String, required: true, trim: true},
        totalAmount: {type: Number, required: true},
        period :{
            startDate : {type: Date, required: true},
            endDate : {type: Date, required: true},
        },
        job : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        },
        skills : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
            required: true,
        }],
        statusMission : {
            type: String, 
            enum: ['pending', 'accepted', 'refused', 'in progress', 'finished'], 
            required: true, 
            default: 'pending'
        },
    }],
});

//TODO: control with express-validator

module.exports = mongoose.model('Company', companySchema);