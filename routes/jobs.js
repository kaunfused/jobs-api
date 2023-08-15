const express = require("express");
const router = express.Router();

const Jobs = require("../controllers/jobs");

router.get("/", Jobs.getAllJobs);
router.post("/", Jobs.createJobs);

router.get("/:id", Jobs.getASingleJob);
router.delete("/:id", Jobs.deleteJobs);
router.patch("/:id", Jobs.updateJobs);

module.exports = router;
