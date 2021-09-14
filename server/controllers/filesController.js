const multer = require("multer");
const path = require("path");
const fs = require("fs");

let fileName = "";

const prescriptionStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../prescriptions/"));
  },
  filename: (req, file, cb) => {
    fileName = "" + req.body.prescriptionName + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const uploadPrescription = multer({
  storage: prescriptionStorageEngine,
}).single("prescriptionFile");

const uploadPrescriptionToServer = (req, res) => {
  uploadPrescription(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
    });
  });
};

const downloadPrescription = async (req, res) => {
  try {
    const prescriptionName = req.params.prescriptionName;
    const prescriptionPath = path.join(
      __dirname,
      "..",
      "prescriptions",
      prescriptionName
    );
    var file = fs.createReadStream(prescriptionPath);
    file.pipe(res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports = {
  uploadPrescriptionToServer,
  downloadPrescription,
};
