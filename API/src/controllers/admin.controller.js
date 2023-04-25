const User = require("../models/user.model");

/*
 * @route GET API.FindFreelance/v1/admin/
 * @desc Get all admin accounts
 * @access Private (Admin)
 */
exports.getAllAdmins = async (req, res) => {
  try {
    const allUsers = await User.find();
    const admins = allUsers.filter((user) => user.isAdmin === true);
    if (!admins) {
      return res.status(404).send({
        message: "No admin found.",
        auth: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "Admins retrieved successfully.",
      auth: true,
      data: admins,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while retrieving admins : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route GET API.FindFreelance/v1/admin/:id
 * @desc Get one admin account
 * @access Private (Admin)
 * @param id
 */
exports.getOneAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        message: "No user found.",
        auth: false,
        data: null,
      });
    }
    if (!user.isAdmin) {
      return res.status(404).send({
        message: "No admin user.",
        auth: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "Admin retrieved successfully.",
      auth: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while retrieving admin : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route PUT API.FindFreelance/v1/admin/:id
 * @desc Update admin information
 * @access Private (Admin)
 * @param id
 */
exports.updateOneAdmin = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "No user found.",
          auth: false,
          data: null,
        });
      }
      if (!user.isAdmin) {
        return res.status(404).send({
          message: "No admin user.",
          auth: false,
          data: null,
        });
      }
      User.findById(user._id).then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "No user found.",
            auth: false,
            data: null,
          });
        }
        res.status(200).send({
          message: "Admin updated successfully.",
          auth: true,
          data: user,
        });
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while updating admin : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route DELETE API.FindFreelance/v1/admin/:id
 * @desc Delete admin account
 * @access Private (Admin)
 * @param id
 */
exports.deleteAdmin = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "No user found.",
          auth: false,
          data: null,
        });
      }
      if (!user.isAdmin) {
        return res.status(404).send({
          message: "No admin user.",
          auth: false,
          data: null,
        });
      }
      res.status(200).send({
        message: "Admin deleted successfully.",
        auth: true,
        data: user,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while deleting admin : " + error,
      auth: false,
      data: null,
    });
  }
};
