package com.example.safelens

import android.content.Context
import android.content.Intent

object EmergencyHandler {

    fun trigger(
        context: Context,
        source: String
    ) {

        val intent = Intent(
            context,
            SafetyCheckInActivity::class.java
        ).apply {

            flags =
                Intent.FLAG_ACTIVITY_NEW_TASK or
                        Intent.FLAG_ACTIVITY_CLEAR_TOP or
                        Intent.FLAG_ACTIVITY_SINGLE_TOP

            putExtra(
                "source",
                source
            )
        }

        context.startActivity(intent)
    }

    fun triggerWithLocation(
        context: Context,
        source: String,
        latitude: Double,
        longitude: Double
    ) {

        // Backend integration will be handled
        // by the backend team.

        android.util.Log.d(
            "SafeLensEmergency",
            "Emergency source: $source"
        )

        android.util.Log.d(
            "SafeLensEmergency",
            "Latitude: $latitude"
        )

        android.util.Log.d(
            "SafeLensEmergency",
            "Longitude: $longitude"
        )
    }

    fun triggerManual(
        context: Context
    ) {

        trigger(
            context,
            "TEXT"
        )
    }
}