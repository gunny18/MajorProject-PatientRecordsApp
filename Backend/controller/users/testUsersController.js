const User = require("../../model/User");

const getUsers = async (req, res) => {
  const users = await User.find({}).exec();
  if (!users) return res.status(400).json({ message: "No users in DB" });
  return res.status(200).json({ users });
};

module.exports = {getUsers}