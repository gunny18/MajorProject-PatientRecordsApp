const User = require("../../model/User");
const bcrypt = require("bcrypt");
const Uid = require("../../model/Uid");

const registerUser = async (req, res) => {
  const { uid } = req.query;
  if (!uid)
    return res
      .status(400)
      .json({ message: "Cannot register user without uid" });
  const duplicate_uid = await Uid.findOne({ uid }).exec();
  console.log(`duplicate uid--->${duplicate_uid}`);
  if (duplicate_uid)
    return res
      .status(409)
      .json({ message: "User with specified Uid already exists" });
  const { username, email, password } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: "Username, password and email is required" });

  const duplicate = await User.findOne({
    username: username,
    email: email,
  }).exec();
  if (duplicate)
    return res.status(409).json({ message: "User already exists" });

  try {
    const newUid = await Uid.create({ uid });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      uid,
    });
    res.status(200).json({
      message: `New user ${newUser.username} created with uid also created ${newUid.uid}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };
