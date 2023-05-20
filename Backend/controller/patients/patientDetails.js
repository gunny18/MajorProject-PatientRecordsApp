const Patient = require("../../model/Patient");
const User = require("../../model/User");
const { connectDB } = require("../../config/dbConnect");

const registerPatient = async (req, res) => {
  const { patientId, firstName, lastName, weight, height, bloodGroup } =
    req.body;
  const canRegister = [
    patientId,
    firstName,
    lastName,
    weight,
    height,
    bloodGroup,
  ].every(Boolean);
  if (!canRegister) {
    return res
      .status(400)
      .json({ message: "Missing data in mandatory fields" });
  }
  const duplicatePatient = await Patient.findOne({ patientId }).exec();
  if (duplicatePatient) {
    return res.status(400).json({
      message:
        "The patient is already registered, cannot register same patient again",
    });
  }
  const bmi = Math.round(
    (Number(weight) / (Number(height) * Number(height))) * 10000
  );
  const newPatient = await Patient.create({
    patientId,
    firstName,
    lastName,
    weight,
    height,
    bmi,
    bloodGroup,
  });

  const updatedUser = await User.findOneAndUpdate(
    { patientId },
    { patientDetails: true },
    { new: true }
  ).exec();

  console.log(updatedUser);

  return res
    .status(200)
    .json({ message: "created new patient successfully", newPatient });
};

const getPatientDetails = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Received no id" });
  }
  const patient = await Patient.findOne({ patientId: id }).exec();
  if (!patient) {
    return res.status(400).json({ message: "Invalid patient id" });
  }
  return res
    .status(200)
    .json({ message: "Successfully queried patient", patient });
};

const uploadPatientRecord = async (req, res) => {
  try {
    const { id: patientId } = req.params;
    if (!patientId) {
      return res.status(404).json({ message: "Non patient id received" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  console.log(req.file);
  return res.status(200).json({ message: "Uploaded file", file: req.file });
};

const queryPatientRecords = async (req, res) => {
  const { id: patientId } = req.params;
  if (!patientId) {
    return res.status(404).json({ message: "No id provided" });
  }
  try {
    const { id: patientId } = req.params;
    if (!patientId) {
      return res.status(404).json({ message: "Received no id" });
    }
    const { gridBucket } = await connectDB();
    const files = await gridBucket
      .find({ "metadata.patientId": patientId })
      .toArray();
    // console.log(files);
    if (!files || files.length == 0) {
      return res.status(404).json({ message: "No records exist" });
    }
    return res.status(200).json({ message: "Queried files", files });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const downloadPatietRecord = async (req, res) => {
  try {
    const { id: patientId, filename } = req.params;
    if (!patientId || !filename) {
      return res.status(400).json({
        message: "cannot find record without patientID and file name",
      });
    }
    const config = await connectDB();
    const file = await config.gridBucket
      .find({
        filename,
        "metadata.patientId": patientId,
      })
      .toArray();
    if (!file || file.length == 0) {
      return res.status(404).json({ message: "Could not find the record" });
    }
    res.set({
      "Accept-Ranges": "bytes",
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Type": file[0].contentType,
    });
    console.log("file----->", file[0]);
    const downStream = config.gridBucket.openDownloadStreamByName(filename);
    // console.log(downStream);
    downStream.pipe(res);
  } catch (error) {
    return res.status(404).json({ message: error?.message });
  }
};

module.exports = {
  registerPatient,
  getPatientDetails,
  uploadPatientRecord,
  queryPatientRecords,
  downloadPatietRecord,
};
