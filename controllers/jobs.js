class Jobs {
  static getAllJobs = async (req, res) => {
    res.send("get all jobs");
  };

  static getASingleJob = async (req, res) => {
    res.send("get a single job");
  };

  static deleteJobs = async (req, res) => {
    res.send("delete jobs");
  };

  static createJobs = async (req, res) => {
    res.send("create jobs");
  };

  static updateJobs = async (req, res) => {
    res.send("update jobs");
  };
}

module.exports = Jobs;
