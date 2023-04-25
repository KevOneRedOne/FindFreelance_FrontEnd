const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    skillName : {type: String, required: true, unique: true, trim: true},
    skillDescription: {type: String, required: false, trim: true, default: 'No description'},
});

module.exports = mongoose.model('Skill', SkillSchema);
