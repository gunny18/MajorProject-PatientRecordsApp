const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Uid = require("../../model/Uid");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password fields are required" });
  const foundUser = await User.findOne({ email:username }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Invalid username or password" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const access_token = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    const refresh_token = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const currentUser = await User.findOneAndUpdate(
      { username: foundUser.username },
      { refreshToken: refresh_token },
      { new: true }
    ).exec();
    await Uid.findOneAndUpdate({ uid: currentUser.uid }, { active: true });
    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json({ accessToken: access_token, currentUser });
  } else
    return res.status(401).json({ message: "Invalid username or password" });
};

module.exports = { handleLogin };
