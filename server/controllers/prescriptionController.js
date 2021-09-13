const Prescription = require("../models/prescription");

const create = (req, res) => {
  let newUser = new Prescription(req.body);
  newUser.save((err, prescriptionData) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "User saved successfully",
      prescriptionId: prescriptionData._id,
    });
  });
};

const getAllByCustomer = (req, res) => {
  const { customer } = req.body;
  Prescription.find({ customer }).exec((err, prescriptions) => {
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
  Prescription.findByIdAndDelete(req.params.id).exec((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "User deleted successfully",
      deletedUser,
    });
  });
};

module.exports = {
  create,
  getAllByCustomer,
  getById,
  update,
  remove,
};
