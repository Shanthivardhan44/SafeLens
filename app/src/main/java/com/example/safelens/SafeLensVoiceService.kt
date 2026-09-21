package com.example.safelens

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.IBinder
import androidx.core.app.NotificationCompat

class SafeLensVoiceService : Service() {

    companion object {

        const val ACTION_START =
            "com.example.safelens.ACTION_START"

        const val ACTION_STOP =
            "com.example.safelens.ACTION_STOP"

        private const val CHANNEL_ID =
            "safelens_voice_channel"

        private const val NOTIFICATION_ID = 1001
    }

    private var voiceDetector: VoiceEmergencyDetector? = null

    override fun onCreate() {
        super.onCreate()

        createNotificationChannel()

        voiceDetector =
            VoiceEmergencyDetector(
                context = this,
                onEmergencyDetected = {

                    EmergencyHandler.trigger(
                        this,
                        "VOICE"
                    )
                }
            )
    }

    override fun onStartCommand(
        intent: Intent?,
        flags: Int,
        startId: Int
    ): Int {

        when (intent?.action) {

            ACTION_START -> {

                startForeground(
                    NOTIFICATION_ID,
                    createNotification()
                )

                voiceDetector?.start()
            }

            ACTION_STOP -> {

                stopVoiceDetection()
                stopForeground(STOP_FOREGROUND_REMOVE)
                stopSelf()
            }
        }

        return START_NOT_STICKY
    }

    private fun stopVoiceDetection() {

        voiceDetector?.stop()
        voiceDetector = null
    }

    private fun createNotification(): Notification {

        return NotificationCompat.Builder(
            this,
            CHANNEL_ID
        )
            .setContentTitle("SafeLens")
            .setContentText(
                "Safety Session is active"
            )
            .setSmallIcon(
                R.mipmap.ic_launcher
            )
            .setOngoing(true)
            .build()
    }

    private fun createNotificationChannel() {

        val channel =
            NotificationChannel(
                CHANNEL_ID,
                "SafeLens Voice Monitoring",
                NotificationManager.IMPORTANCE_LOW
            )

        val manager =
            getSystemService(
                NotificationManager::class.java
            )

        manager.createNotificationChannel(channel)
    }

    override fun onDestroy() {

        stopVoiceDetection()

        super.onDestroy()
    }

    override fun onBind(
        intent: Intent?
    ): IBinder? {
        return null
    }
}