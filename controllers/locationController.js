const Emergency = require("../models/Emergency");


// ==============================
// UPDATE LOCATION
// ==============================
const updateLocation = async (req, res) => {
    try {
        const { latitude, longitude, emergencyId } = req.body;

        if (
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required"
            });
        }

        // If an emergency ID is provided,
        // update that emergency
        if (emergencyId) {
            const emergency = await Emergency.findOneAndUpdate(
                {
                    _id: emergencyId,
                    user: req.user.userId
                },
                {
                    latitude,
                    longitude,
                    locationShared: true
                },
                {
                    new: true
                }
            );

            if (!emergency) {
                return res.status(404).json({
                    success: false,
                    message: "Emergency event not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Location updated",
                emergency
            });
        }

        // Otherwise update the user's latest active emergency
        const emergency = await Emergency.findOneAndUpdate(
            {
                user: req.user.userId,
                status: {
                    $in: ["warning", "active"]
                }
            },
            {
                latitude,
                longitude,
                locationShared: true
            },
            {
                new: true,
                sort: { createdAt: -1 }
            }
        );

        if (!emergency) {
            return res.status(404).json({
                success: false,
                message: "No active emergency found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Location updated successfully",
            emergency
        });

    } catch (error) {
        console.error("Location update error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while updating location"
        });
    }
};


// ==============================
// GET LATEST LOCATION
// ==============================
const getLatestLocation = async (req, res) => {
    try {
        const emergency = await Emergency.findOne({
            user: req.user.userId,
            locationShared: true
        }).sort({ createdAt: -1 });

        if (!emergency) {
            return res.status(404).json({
                success: false,
                message: "No location available"
            });
        }

        res.status(200).json({
            success: true,
            location: {
                latitude: emergency.latitude,
                longitude: emergency.longitude
            },
            emergencyId: emergency._id,
            updatedAt: emergency.updatedAt
        });

    } catch (error) {
        console.error("Get location error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching location"
        });
    }
};


module.exports = {
    updateLocation,
    getLatestLocation
};