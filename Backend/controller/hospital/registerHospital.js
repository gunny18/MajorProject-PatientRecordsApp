const Hospital = require("../../model/Hospital");
const bcrypt = require("bcrypt");

const registerHospital = async (req, res) => {
  try {
    const { hospitalName, hospitalEmail, hospitalPassword } = req.body;
    if (!hospitalName || !hospitalEmail || !hospitalPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const duplicate = await Hospital.findOne({
      hospitalEmail,
      hospitalName,
    }).exec();
    if (duplicate) {
      return res.status(409).json({ message: "Hospital already registered" });
    }
    const hashedPassword = await bcrypt.hash(hospitalPassword, 10);
    const newHospital = await Hospital.create({
      hospitalName,
      hospitalEmail,
      hospitalPassword: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "Hospital registered successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { registerHospital };
