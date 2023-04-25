const mongoose = require('mongoose');

const FreelanceSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    socialReason: {
        type: String, 
        required: false,
        default: 'Freelance', 
        trim: true
    },
    socialStatus: {
        type: String,
        enum: ['EI','EURL'],
        required: false,
        default: 'EI',
        trim: true
    },
    dailyRate: {
        type: Number, 
        required: true,
        min: 200,
        max: 1000,
        default: 10
    },
    yearsOfExperience: {type: Number, required: true, default: 0},
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    }],
});

module.exports = mongoose.model('Freelance', FreelanceSchema);
