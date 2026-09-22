const express = require("express");

const {
    createEmergency,
    getEmergencyHistory
} = require("../controllers/emergencyController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Trigger emergency
router.post("/", authMiddleware, createEmergency);

// Get emergency history
router.get("/", authMiddleware, getEmergencyHistory);

module.exports = router;