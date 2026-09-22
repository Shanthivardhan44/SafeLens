const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        trigger: {
            type: String,
            enum: [
                "I am unsafe",
                "HELP",
                "HELP HELP",
                "NEED HELP",
                "DANGER",
                "MANUAL"
            ],
            required: true
        },

        status: {
            type: String,
            enum: [
                "warning",
                "active",
                "resolved",
                "cancelled"
            ],
            default: "warning"
        },

        response: {
            type: String,
            enum: [
                "SAFE",
                "BAD",
                "NEED HELP",
                "DANGER",
                null
            ],
            default: null
        },

        latitude: {
            type: Number,
            default: null
        },

        longitude: {
            type: Number,
            default: null
        },

        locationShared: {
            type: Boolean,
            default: false
        },

        assistanceRequested: {
            type: Boolean,
            default: false
        },

        dangerDetected: {
            type: Boolean,
            default: false
        },

        endedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Emergency", emergencySchema);