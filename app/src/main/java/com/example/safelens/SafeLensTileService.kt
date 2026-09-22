package com.example.safelens

import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import android.service.quicksettings.Tile
import android.service.quicksettings.TileService

class SafeLensTileService : TileService() {

    override fun onStartListening() {
        super.onStartListening()
        updateTile()
    }

    override fun onClick() {
        super.onClick()

        val enabled =
            SafeLensState.toggle(this)

        if (enabled) {

            // SafeLens is ON.
            // Do NOT start microphone yet.
            openSafeLensScreen()

        } else {

            // SafeLens is OFF.
            // Make sure microphone is stopped.
            SafeLensController.stop(this)
        }
        updateTile()
    }

    private fun openSafeLensScreen() {

        val intent =
            Intent(
                this,
                MainActivity::class.java
            ).apply {

                flags =
                    Intent.FLAG_ACTIVITY_NEW_TASK or
                            Intent.FLAG_ACTIVITY_CLEAR_TOP
            }

        val pendingIntent =
            PendingIntent.getActivity(
                this,
                1001,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or
                        PendingIntent.FLAG_IMMUTABLE
            )

        if (
            Build.VERSION.SDK_INT >=
            Build.VERSION_CODES.UPSIDE_DOWN_CAKE
        ) {

            startActivityAndCollapse(
                pendingIntent
            )

        } else {

            @Suppress("DEPRECATION")
            startActivityAndCollapse(
                intent
            )
        }
    }

    private fun updateTile() {

        val enabled =
            SafeLensState.isEnabled(this)

        qsTile?.apply {

            state =
                if (enabled) {
                    Tile.STATE_ACTIVE
                } else {
                    Tile.STATE_INACTIVE
                }

            label =
                if (enabled) {
                    "SafeLens ON"
                } else {
                    "SafeLens OFF"
                }

            updateTile()
        }
    }
}