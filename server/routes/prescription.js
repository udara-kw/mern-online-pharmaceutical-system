const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescriptionController");

// create prescription
router.post("/prescription/create", prescriptionController.create);


// get all by customer
router.get("/prescription/getAllByCustomer/:id", prescriptionController.getAllByCustomer);

// get specific
router.get("/prescription/:id", prescriptionController.getById);

// update user
router.put("/prescription/update/:id", prescriptionController.update);

// delete user
router.delete("/prescription/delete/:id", prescriptionController.remove);

module.exports = router;
