const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    freelance : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelance',
        required: true,
    },
    compmany : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    startDateProposal: {type: Date, required: true},
    endDateProposal: {type: Date, required: true},
    statusProposal: {
        type: String,
        enum: ['pending','accepted','refused'],
        required: true,
        default: 'pending'
    },
});

module.exports = mongoose.model('Proposal', ProposalSchema);
