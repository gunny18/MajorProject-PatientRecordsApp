const express = require("express");
const router = express.Router();
const {
  registerPatient,
  getPatientDetails,
  uploadPatientRecord,
  queryPatientRecords,
  downloadPatietRecord,
} = require("../../controller/patients/patientDetails");
const { upload } = require("../../middleware/gridFsStorage");

router.route("/").post(registerPatient).get(getPatientDetails);

router.route("/:id/upload").post(upload.single("file"), uploadPatientRecord);

router.get("/:id/records", queryPatientRecords);

router.get("/:id/records/:filename", downloadPatietRecord);

module.exports = router;
