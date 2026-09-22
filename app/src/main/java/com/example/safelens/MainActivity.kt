package com.example.safelens

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat

class MainActivity : ComponentActivity() {

    private lateinit var statusText: TextView
    private lateinit var startButton: Button
    private lateinit var stopButton: Button

    private val microphonePermissionLauncher =
        registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { granted ->

            if (granted) {
                startSafetySession()
            } else {
                Toast.makeText(
                    this,
                    "Microphone permission is required",
                    Toast.LENGTH_LONG
                ).show()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        createScreen()
        updateScreen()
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

        statusText = TextView(this).apply {
            textSize = 20f
        }

        startButton = Button(this).apply {
            text = "🟢 START SAFETY SESSION"

            setOnClickListener {
                requestMicrophonePermissionAndStart()
            }
        }

        stopButton = Button(this).apply {
            text = "🔴 STOP SAFETY SESSION"

            setOnClickListener {
                stopSafetySession()
            }
        }

        // -----------------------------------------
        // TEXT EMERGENCY TEST
        // -----------------------------------------

        val messageInput = EditText(this).apply {
            hint = "Type: I am unsafe"
            textSize = 18f
        }

        val sendButton = Button(this).apply {
            text = "SEND EMERGENCY MESSAGE"

            setOnClickListener {

                val message = messageInput
                    .text
                    .toString()
                    .trim()
                    .lowercase()

                if (isEmergencyMessage(message)) {

                    EmergencyHandler.triggerManual(
                        this@MainActivity
                    )

                } else {

                    Toast.makeText(
                        this@MainActivity,
                        "Emergency phrase not detected",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }

        layout.addView(title)
        layout.addView(statusText)

        layout.addView(startButton)
        layout.addView(stopButton)

        layout.addView(messageInput)
        layout.addView(sendButton)

        setContentView(layout)
    }

    // =========================================================
    // MICROPHONE PERMISSION
    // =========================================================

    private fun requestMicrophonePermissionAndStart() {

        val permission =
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.RECORD_AUDIO
            )

        if (
            permission ==
            PackageManager.PERMISSION_GRANTED
        ) {

            startSafetySession()

        } else {

            microphonePermissionLauncher.launch(
                Manifest.permission.RECORD_AUDIO
            )
        }
    }

    // =========================================================
    // START SAFETY SESSION
    // =========================================================

    private fun startSafetySession() {

        if (!SafeLensState.isEnabled(this)) {

            Toast.makeText(
                this,
                "Turn SafeLens ON from Quick Settings first",
                Toast.LENGTH_LONG
            ).show()

            return
        }

        SafeLensController.start(this)

        updateScreen()

        Toast.makeText(
            this,
            "Safety Session started",
            Toast.LENGTH_SHORT
        ).show()
    }

    // =========================================================
    // STOP SAFETY SESSION
    // =========================================================

    private fun stopSafetySession() {

        SafeLensController.stop(this)

        updateScreen()

        Toast.makeText(
            this,
            "Safety Session stopped",
            Toast.LENGTH_SHORT
        ).show()
    }

    // =========================================================
    // SCREEN STATE
    // =========================================================

    private fun updateScreen() {

        val safeLensEnabled =
            SafeLensState.isEnabled(this)

        val sessionActive =
            SafeLensState.isSessionActive(this)

        statusText.text = when {

            !safeLensEnabled -> {

                "🛡️ SafeLens OFF\n" +
                        "🎙️ Microphone OFF"
            }

            sessionActive -> {

                "🛡️ SafeLens ON\n" +
                        "🟢 Safety Session ACTIVE\n" +
                        "🎙️ Microphone ON"
            }

            else -> {

                "🛡️ SafeLens ON\n" +
                        "⚪ Safety Session not started\n" +
                        "🎙️ Microphone OFF"
            }
        }

        startButton.isEnabled =
            safeLensEnabled && !sessionActive

        stopButton.isEnabled =
            sessionActive
    }

    // =========================================================
    // TEXT EMERGENCY
    // =========================================================

    private fun isEmergencyMessage(
        message: String
    ): Boolean {

        val emergencyPhrases = listOf(

            "i am unsafe",
            "i'm unsafe",
            "i am in danger",
            "i'm in danger",
            "help",
            "help help",
            "save me",
            "please help"
        )

        return emergencyPhrases.any { phrase ->
            message.contains(phrase)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}