const Hospital = require("../../model/Hospital");
const bcrypt = require("bcrypt");

const loginHospital = async (req, res) => {
  try {
    const { hospitalEmail, hospitalPassword } = req.body;
    if (!hospitalEmail || !hospitalPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const hospital = await Hospital.findOne({ hospitalEmail }).exec();
    if (!hospital)
      return res.status(401).json({ message: "Invalid email or password" });
    const match = await bcrypt.compare(
      hospitalPassword,
      hospital.hospitalPassword
    );
    if (match) {
      const currentHosp = await Hospital.findOneAndUpdate(
        { hospitalEmail },
        { active: true },
        { new: true }
      ).exec();
      return res
        .status(200)
        .json({ message: "Logged in successfully", hospital: currentHosp });
    } else {
      return res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { loginHospital };
