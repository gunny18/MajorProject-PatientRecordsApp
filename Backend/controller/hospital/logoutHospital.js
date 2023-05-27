const Hospital = require("../../model/Hospital");

const logoutHospital = async (req, res) => {
  try {
    const { hospitalId } = req.query;
    if (!hospitalId)
      return res.status(403).json({ message: "No hospital id received" });
    const hosp = await Hospital.findOne({ hospitalId }).exec();
    if (!hosp) return res.status(401).json({ message: "Invalid hospital id" });
    await Hospital.findOneAndUpdate({ hospitalId }, { active: false }).exec();
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { logoutHospital };
