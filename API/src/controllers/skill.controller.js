const Skill = require("../models/skills.model");

/*
 * @route POST API.FindFreelance/v1/skill/admin/newskill
 * @desc Create a new skill
 * @access Private (Admin)
 */
exports.createSkill = async (req, res) => {
  if (await Skill.findOne({ name: req.body.name })) {
    return res
      .status(400)
      .send({ message: "Skill already exists", auth: false, token: null });
  }
  const newSkill = new Skill({
    skillName: req.body.name,
    skillDescription: req.body.description,
  });

  try {
    await newSkill.save();
    res.status(200).send({
      message: "Skill created successfully.",
      auth: true,
      data: newSkill,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while creating Skill : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route GET API.FindFreelance/v1/skill/all
 * @desc Get all skills
 * @access Public
 */
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    if (!skills) {
      return res.status(404).send({
        message: "No skills found.",
        auth: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "Skills retrieved successfully.",
      auth: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while retrieving skills : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route GET API.FindFreelance/v1/skill/:id
 * @desc Get one skill
 * @access Public
 * @param id
 */
exports.getOneSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.status(200).send({
      message: "Skill retrieved successfully.",
      auth: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while retrieving skill : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route PUT API.FindFreelance/v1/skill/admin/update/:id
 * @desc Update skill information
 * @access Private (Admin)
 * @param id
 */
exports.updateOneSkill = async (req, res) => {
    try {
        await Skill.findByIdAndUpdtate(req.params.id, req.body).then((skill) => {
            if (!skill) {
                return res.status(404).send({
                    message: "No skill found.",
                    auth: false,
                    data: null,
                });
            }
            res.status(200).send({
                message: "Skill updated successfully.",
                auth: true,
                data: skill,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating skill : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
 * @route DELETE API.FindFreelance/v1/skill/admin/delete/:id
 * @desc Delete skill
 * @access Private (Admin)
 * @param id
 */
exports.deleteOneSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id).then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "No skill found.",
          auth: false,
          data: null,
        });
      }
      res.status(200).send({
        message: "Skill deleted successfully.",
        auth: true,
        data: skill,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while deleting skill : " + error,
      auth: false,
      data: null,
    });
  }
};
