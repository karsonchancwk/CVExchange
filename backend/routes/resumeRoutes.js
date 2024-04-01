const router = require("express").Router();
const User = require("../models/UserModel");
const Resume = require("../models/ResumeModel");

// New Resume
router.route("/new/:address").post(async (req, res) => {
  try {
    const address = req?.params?.address;
    if (!address) throw new Error("No address");
    console.log(address);

    const cv = req?.body?.cv;
    if (!cv) throw new Error("No CV");
    console.log(cv);

    const newCV = await Resume.create({
      owner: address,
      exp: cv.exp,
      edu: cv.edu,
      skills: cv.skills,
      accessors: [],
    });

    const user = await User.findOneAndUpdate(
      { _id: address },
      { $push: { _resume: newCV._id } },
      { new: true }
    );

    res.apiResponse({ result: { user } });
  } catch (error) {
    res.apiError(error);
  }
});

module.exports = router;
