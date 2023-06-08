const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

let metadata;

const storage = new GridFsStorage({
  url: process.env.MONGO_DRIVER_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (req.params) {
        metadata = {
          patientId: req.params.id,
        };
      }
      const fileInfo = {
        filename: file.originalname,
        bucketName: "gridUploads",
        metadata: metadata ? metadata : null,
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

module.exports = { upload };
