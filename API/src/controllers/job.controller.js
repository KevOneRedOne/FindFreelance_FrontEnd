const Job = require("../models/jobs.model");

/*
 * @route POST API.FindFreelance/v1/job/admin/newjob
 * @desc Create a new job
 * @access Private (Admin)
 */
exports.createJob = async (req, res) => {
  if (await Job.findOne({ name: req.body.name })) {
    return res
      .status(400)
      .send({ message: "Job already exists", auth: false, token: null });
  }
  const newJob = new Job({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    await newJob.save();
    res.status(200).send({
      message: "Job created successfully.",
      auth: true,
      data: newJob,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while creating job : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route GET API.FindFreelance/v1/job/all
 * @desc Get all jobs
 * @access Public
 */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (!jobs) {
      return res.status(404).send({
        message: "No jobs found.",
        auth: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "Jobs retrieved successfully.",
      auth: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while retrieving jobs : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route GET API.FindFreelance/v1/job/:id
 * @desc Get one job
 * @access Public
 * @param id
 */
exports.getOneJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).send({
      message: "Job retrieved successfully.",
      auth: true,
      data: job,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while retrieving job : " + error,
      auth: false,
      data: null,
    });
  }
};

/*
 * @route PUT API.FindFreelance/v1/job/admin/update/:id
 * @desc Update job information
 * @access Private (Admin)
 * @param id
 */
exports.updateOneJob = async (req, res) => {
    try {
        await Job.findByIdAndUpdtate(req.params.id, req.body).then((job) => {
            if (!job) {
                return res.status(404).send({
                    message: "No job found.",
                    auth: false,
                    data: null,
                });
            }
            res.status(200).send({
                message: "Job updated successfully.",
                auth: true,
                data: job,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while updating job : " + error,
            auth: false,
            data: null,
        });
    }
};

/*
 * @route DELETE API.FindFreelance/v1/job/admin/delete/:id
 * @desc Delete job
 * @access Private (Admin)
 * @param id
 */
exports.deleteOneJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id).then((job) => {
      if (!job) {
        return res.status(404).send({
          message: "No job found.",
          auth: false,
          data: null,
        });
      }
      res.status(200).send({
        message: "Job deleted successfully.",
        auth: true,
        data: job,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while deleting job : " + error,
      auth: false,
      data: null,
    });
  }
};
