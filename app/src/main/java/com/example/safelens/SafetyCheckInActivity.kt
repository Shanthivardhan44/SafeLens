package com.example.safelens

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat

class SafetyCheckInActivity : ComponentActivity() {

    private lateinit var timerText: TextView

    private var pendingEmergencySource: String? = null

    private val locationPermissionLauncher =
        registerForActivityResult(
            ActivityResultContracts.RequestMultiplePermissions()
        ) { permissions ->

            val fineGranted =
                permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true

            val coarseGranted =
                permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true

            if (fineGranted || coarseGranted) {
                getEmergencyLocation()
            } else {
                Toast.makeText(
                    this,
                    "Location permission is required",
                    Toast.LENGTH_LONG
                ).show()

                pendingEmergencySource = null

                stopSafeLensSession()
                finish()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        createScreen()
        startSafetyCheckIn()
    }

    private fun createScreen() {

        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(40, 60, 40, 40)
        }

        val title = TextView(this).apply {
            text = "🛡️ SAFELENS"
            textSize = 28f
        }

        val source = intent.getStringExtra("source")

        val sourceText = TextView(this).apply {
            text = when (source) {
                "VOICE" ->
                    "⚠️ Emergency detected by voice"

                "TEXT" ->
                    "⚠️ Emergency triggered manually"

                else ->
                    "⚠️ Safety check required"
            }

            textSize = 18f
        }

        val question = TextView(this).apply {
            text = "Are you safe right now?"
            textSize = 22f
        }

        timerText = TextView(this).apply {
            text = "10:00"
            textSize = 40f
        }

        // -----------------------------------------------------
        // SAFE
        // -----------------------------------------------------

        val safeButton = Button(this).apply {

            text = "🟢 I'M SAFE"

            setOnClickListener {

                SafetyCheckInManager.selectStatus(
                    SafetyStatus.SAFE
                )

                SafetyCheckInManager.stop()

                stopSafeLensSession()

                finish()
            }
        }

        // -----------------------------------------------------
        // BAD
        // -----------------------------------------------------

        val badButton = Button(this).apply {

            text = "🟠 I'M NOT OK"

            setOnClickListener {

                SafetyCheckInManager.selectStatus(
                    SafetyStatus.BAD
                )

                SafetyCheckInManager.stop()

                requestEmergencyLocation("BAD")
            }
        }

        // -----------------------------------------------------
        // DANGER
        // -----------------------------------------------------

        val dangerButton = Button(this).apply {

            text = "🔴 I'M IN DANGER"

            setOnClickListener {

                SafetyCheckInManager.selectStatus(
                    SafetyStatus.DANGER
                )

                SafetyCheckInManager.stop()

                requestEmergencyLocation("DANGER")
            }
        }

        // -----------------------------------------------------
        // EXTEND
        // -----------------------------------------------------

        val extendButton = Button(this).apply {

            text = "+5 MINUTES"

            setOnClickListener {

                SafetyCheckInManager.extend(

                    additionalMinutes = 5,

                    onTick = { millis ->
                        updateTimer(millis)
                    },

                    onFinished = {

                        stopSafeLensSession()
                        finish()
                    }
                )
            }
        }

        layout.addView(title)
        layout.addView(sourceText)
        layout.addView(question)
        layout.addView(timerText)

        layout.addView(safeButton)
        layout.addView(badButton)
        layout.addView(dangerButton)
        layout.addView(extendButton)

        setContentView(layout)
    }

    // =========================================================
    // START CHECK-IN
    // =========================================================

    private fun startSafetyCheckIn() {

        SafetyCheckInManager.start(

            onTick = { millis ->
                updateTimer(millis)
            },

            onFinished = {

                // 10-minute window expired.
                stopSafeLensSession()
                finish()
            }
        )
    }

    // =========================================================
    // LOCATION PERMISSION
    // =========================================================

    private fun requestEmergencyLocation(
        source: String
    ) {

        pendingEmergencySource = source

        val fineGranted =
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED

        val coarseGranted =
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED

        if (fineGranted || coarseGranted) {

            getEmergencyLocation()

        } else {

            locationPermissionLauncher.launch(
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )
            )
        }
    }

    // =========================================================
    // LOCATION
    // =========================================================

    private fun getEmergencyLocation() {

        val source =
            pendingEmergencySource ?: return

        LocationHelper.getCurrentLocation(

            context = this,

            onLocationReceived = { latitude, longitude ->

                runOnUiThread {

                    Toast.makeText(
                        this,
                        "Location received: $latitude, $longitude",
                        Toast.LENGTH_LONG
                    ).show()

                    EmergencyHandler.triggerWithLocation(
                        context = this,
                        source = source,
                        latitude = latitude,
                        longitude = longitude
                    )

                    pendingEmergencySource = null

                    stopSafeLensSession()

                    finish()
                }
            },

            onError = { message ->

                runOnUiThread {

                    Toast.makeText(
                        this,
                        "Location error: $message",
                        Toast.LENGTH_LONG
                    ).show()

                    pendingEmergencySource = null

                    stopSafeLensSession()

                    finish()
                }
            }
        )
    }

    // =========================================================
    // STOP EVERYTHING
    // =========================================================

    private fun stopSafeLensSession() {

        SafetyCheckInManager.stop()

        SafeLensController.stop(
            this
        )
    }

    // =========================================================
    // TIMER UI
    // =========================================================

    private fun updateTimer(
        millis: Long
    ) {

        val totalSeconds =
            millis / 1000

        val minutes =
            totalSeconds / 60

        val seconds =
            totalSeconds % 60

        timerText.text =
            String.format(
                "%02d:%02d",
                minutes,
                seconds
            )
    }
}