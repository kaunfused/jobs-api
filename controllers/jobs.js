const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

class Jobs {
  static getAllJobs = async (req, res) => {
    const resp = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ resp, count: resp.length });
  };

  static getASingleJob = async (req, res) => {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });

    if (!job) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No job found with id ${jobId}` });
    }

    return res.status(StatusCodes.OK).json({ job });
  };

  static deleteJobs = async (req, res) => {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

    if (!job) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No job with job id ${jobId}` });
    }

    return res.status(StatusCodes.OK).send();
  };

  static createJobs = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  };

  static updateJobs = async (req, res) => {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;

    if (company === "" || position === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Fields cannot be empty" });
    }

    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No job found with id ${jobId}` });
    }

    return res.status(StatusCodes.OK).json({ job });
  };
}

module.exports = Jobs;
