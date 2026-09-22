const Emergency = require("../models/Emergency");


// ==============================
// CREATE EMERGENCY
// ==============================
const createEmergency = async (req, res) => {
    try {
        const {
            trigger,
            response,
            latitude,
            longitude,
            locationShared,
            assistanceRequested,
            dangerDetected
        } = req.body;

        if (!trigger) {
            return res.status(400).json({
                success: false,
                message: "Emergency trigger is required"
            });
        }

        const emergency = await Emergency.create({
            user: req.user.userId,
            trigger,
            response: response || null,
            latitude: latitude || null,
            longitude: longitude || null,
            locationShared: locationShared || false,
            assistanceRequested: assistanceRequested || false,
            dangerDetected: dangerDetected || false,
            status: dangerDetected || assistanceRequested
                ? "active"
                : "warning"
        });

        res.status(201).json({
            success: true,
            message: "Emergency event recorded",
            emergency
        });

    } catch (error) {
        console.error("Emergency error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating emergency"
        });
    }
};


// ==============================
// GET EMERGENCY HISTORY
// ==============================
const getEmergencyHistory = async (req, res) => {
    try {
        const emergencies = await Emergency.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: emergencies.length,
            emergencies
        });

    } catch (error) {
        console.error("Emergency history error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching emergency history"
        });
    }
};


module.exports = {
    createEmergency,
    getEmergencyHistory
};