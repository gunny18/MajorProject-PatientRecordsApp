const User = require("../../model/User");
const Uid = require("../../model/Uid")
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log("Cookies when logged out is called----->", cookies);
  if (!cookies?.jwt)
    return res
      .status(203)
      .json({ message: "No cookie exists, already logged out!" });
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite:"None",
      secure: true,
    });
    return res.json({
      message:
        "No user with specified refresh token in database, Cleared the cookie",
    });
  }
  const currentUser = await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: "" },
    { new: true }
  ).exec();
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  await Uid.findOneAndUpdate({ uid: currentUser.uid }, { active: false }).exec();
  return res.json({
    message: `${currentUser.username} Logged out successfully`,
  });
};

module.exports = { handleLogout };
