const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {type: String, required: false, trim: true, default: 'No description'},
});

module.exports = mongoose.model('Job', JobSchema);
