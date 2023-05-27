const Hospital = require("../../model/Hospital");
const Uid = require("../../model/Uid");
// const Patient = require("../../model/Patient");
const User = require("../../model/User");

const getActiveCards = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    if (!hospitalId) {
      return res.status(400).json({ message: "No hospital id provided" });
    }
    const uids = await Uid.find({}).exec();
    const hospital = await Hospital.findOne({ hospitalId }).exec();
    if (!hospital) return res.status(401).json({ message: "No such hospital" });
    const activeUids = uids
      .filter((uid) => (uid.active = true))
      .map((uid) => uid.uid);
    console.log(activeUids);
    const users = await User.find({}).exec();
    activePatientIds = users
      .filter((user) => activeUids.includes(user.uid))
      .map((user) => user.patientId);
    console.log(activePatientIds);
    const updatedHospital = await Hospital.findOneAndUpdate(
      { hospitalId },
      {
        patientIds: activePatientIds,
      },
      { new: true }
    ).exec();
    return res
      .status(200)
      .json({ message: "Fetched active patients", hospital: updatedHospital });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getActiveCards };
