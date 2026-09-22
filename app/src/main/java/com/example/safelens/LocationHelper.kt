package com.example.safelens

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.util.Log
import androidx.core.content.ContextCompat
import com.google.android.gms.location.LocationServices

object LocationHelper {

    private const val TAG = "SafeLensLocation"

    fun getCurrentLocation(
        context: Context,
        onLocationReceived: (latitude: Double, longitude: Double) -> Unit,
        onError: (message: String) -> Unit
    ) {

        // Check location permission
        val fineLocationGranted =
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED

        val coarseLocationGranted =
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED

        if (!fineLocationGranted && !coarseLocationGranted) {

            onError("Location permission not granted")

            return
        }

        val fusedLocationClient =
            LocationServices.getFusedLocationProviderClient(context)

        fusedLocationClient.lastLocation
            .addOnSuccessListener { location ->

                if (location != null) {

                    val latitude = location.latitude
                    val longitude = location.longitude

                    Log.d(
                        TAG,
                        "Location: $latitude, $longitude"
                    )

                    onLocationReceived(
                        latitude,
                        longitude
                    )

                } else {

                    onError("Location is not available")
                }
            }
            .addOnFailureListener { exception ->

                Log.e(
                    TAG,
                    "Failed to get location",
                    exception
                )

                onError(
                    exception.message ?: "Unable to get location"
                )
            }
    }
}