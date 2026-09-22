const express = require("express");

const {
    updateLocation,
    getLatestLocation
} = require("../controllers/locationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Update user's location
router.post("/", authMiddleware, updateLocation);

// Get latest location
router.get("/", authMiddleware, getLatestLocation);

module.exports = router;