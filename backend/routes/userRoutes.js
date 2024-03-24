const router = require("express").Router();
const User = require("../models/UserModel");

//login
router.route("/login/:address").get(async (req, res) => {
  try {
    const address = req.params.address;
    const findUser = await User.findOne({ address }).populate("_resume");

    res.apiResponse({ result: { findUser } });
  } catch (error) {
    res.apiError(error);
  }
});

//signup
router.route("/signup/:address").post(async (req, res) => {
  try {
    const address = req.params.address;
    console.log(address);
    console.log(req.body);
    const { name, role } = req.body;
    if (await User.findOne({ address })) throw new Error("Old User");
    const newUser = await User.create({ address, name, role });
    res.apiResponse({ result: { newUser } });
  } catch (error) {
    res.apiError(error);
  }
});
module.exports = router;
