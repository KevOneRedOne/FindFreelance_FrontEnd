const User = require('../models/user.model');

/*
 * @route GET API.FindFreelance/v1/user/all
 * @desc Get all users
 * @access Private (Admin)
 */
exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        if (!users) {
          return res.status(404).send({
            message: "No users found.",
            auth: false,
            data: null,
          });
        }
        res.status(200).send({
          message: "Users retrieved successfully.",
          auth: true,
          data: users,
        });
    } catch (error) {
        res.status(500).send({
          message: "Error while retrieving users : " + error,
          auth: false,
          data: null,
        });
    }
};

/*
 * @route GET API.FindFreelance/v1/user/:id
 * @desc Get one user
 * @access Private (Admin)
 * @param id
 */
exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send({
          message: "User retrieved successfully.",
          auth: true,
          data: user,
        });
    } catch (error) {
        res.status(500).send({
          message: "Error while retrieving user : " + error,
          auth: false,
          data: null,
        });
    }
};

/*
 * @route PUT API.FindFreelance/v1/admin/update/:id
 * @desc Update user information
 * @access Private (Admin)
 * @param id
 */
exports.updateOneUser = async (req, res) => {
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
        User.findById(user._id).then((user) => {
          if (!user) {
            return res.status(404).send({
              message: "No user found.",
              auth: false,
              data: null,
            });
          }
          res.status(200).send({
            message: "User updated successfully.",
            auth: true,
            data: user,
          });
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Error while updating user : " + error,
        auth: false,
        data: null,
      });
    }
};

/*
  * @route DELETE API.FindFreelance/v1/admin/delete/:id 
  * @desc Delete user account
  * @access Private (Admin)
  * @param id
  */
exports.deleteOneUser = async (req, res) => {
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
        res.status(200).send({
          message: "User deleted successfully.",
          auth: true,
          data: user,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Error while deleting user : " + error,
        auth: false,
        data: null,
      });
    }
};

/*
  * @route DELETE API.FindFreelance/v1/user/myaccount/update
  * @desc Update user account
  * @access Private (User)
*/
exports.update_myAccount = async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.userToken.id, req.body)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "No user found. Please login again.",
            auth: false,
            data: null,
          });
        }
        User.findById(user._id).then((user) => {
          if (!user) {
            return res.status(404).send({
              message: "No user found. Please login again.",
              auth: false,
              data: null,
            });
          }
          res.status(200).send({
            message: "User account updated successfully.",
            auth: true,
            data: user,
          });
        });
      });
    } catch (error) {
      res.status(500).send({
          message: 'Error while updating your account : ' + error,
          auth: false,
          token: null
      });
    }
};

/*
  * @route DELETE API.FindFreelance/v1/user/myaccount/delete
  * @desc Delete account for the user
  * @access Private (User)
  * @body token
*/
exports.delete_myAccount = async (req, res) => {
    try {   
        await User.findByIdAndDelete(req.userToken.id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                    auth: false,
                    token: null
                });
            }
            res.status(200).send({
                message: 'Account deleted successfully !',
                auth: false,
                token: null
            });
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error while deleting account : ' + error,
            auth: false,
            token: null
        });
    }
};
