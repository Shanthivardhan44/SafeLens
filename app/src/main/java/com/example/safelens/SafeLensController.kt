package com.example.safelens

import android.content.Context
import android.content.Intent

object SafeLensController {

    fun start(context: Context) {

        // SafeLens itself must be ON.
        if (!SafeLensState.isEnabled(context)) {
            return
        }

        SafeLensState.setSessionActive(
            context,
            true
        )

        val intent = Intent(
            context,
            SafeLensVoiceService::class.java
        ).apply {
            action =
                SafeLensVoiceService.ACTION_START
        }

        context.startForegroundService(intent)
    }

    fun stop(context: Context) {

        SafeLensState.setSessionActive(
            context,
            false
        )

        val intent = Intent(
            context,
            SafeLensVoiceService::class.java
        ).apply {
            action =
                SafeLensVoiceService.ACTION_STOP
        }

        context.startService(intent)
    }
}