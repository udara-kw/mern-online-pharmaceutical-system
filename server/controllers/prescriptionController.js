const Prescription = require("../models/prescription");

const create = (req, res) => {
  let newPrescription = new Prescription(req.body);
  newPrescription.save((err, prescriptionData) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      prescriptionId: prescriptionData._id,
    });
  });
};

const getAllByCustomer = (req, res) => {
  Prescription.find({ customer: req.params.id }, (err, prescriptions) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: prescriptions,
    });
  });
};

const getById = async (req, res) => {
  Prescription.findById(req.params.id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      user: user,
    });
  });
};

const update = (req, res) => {
  Prescription.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const remove = (req, res) => {
  Prescription.findByIdAndDelete(req.params.id).exec(
    (err, deletedPrescription) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Prescription deleted successfully",
        deletedPrescription,
      });
    }
  );
};

module.exports = {
  create,
  getAllByCustomer,
  getById,
  update,
  remove,
};
