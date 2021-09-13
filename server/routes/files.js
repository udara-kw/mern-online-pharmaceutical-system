const express = require("express");
const router = express.Router();
const filesController = require('../controllers/filesController');

router.post("/file", filesController.uploadPrescriptionToServer);
 
router.get("/file/:prescriptionName", filesController.downloadPrescription);

module.exports = router;
