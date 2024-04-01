const router = require("express").Router();
const User = require("../models/UserModel");
const Resume = require("../models/ResumeModel");

//login
router.route("/signin/:address").get(async (req, res) => {
  try {
    const address = req.params.address;
    console.log(address);
    const thisUser = await User.findOne({ _id: address }).populate("_resume");
    console.log(thisUser);
    res.apiResponse({ result: { thisUser } });
  } catch (error) {
    res.apiError(error);
  }
});

//signup
router.route("/signup/:address").post(async (req, res) => {
  try {
    const address = req?.params?.address;
    console.log(address);
    console.log(req.body);
    const { name, role } = req.body;
    if (await User.findById({ _id: address })) throw new Error("Old User");
    const newUser = await User.create({ _id: address, name, role });
    res.apiResponse({ result: { newUser } });
  } catch (error) {
    res.apiError(error);
  }
});
module.exports = router;
