package com.example.safelens

import android.service.quicksettings.Tile
import android.service.quicksettings.TileService

class SafeLensTileService : TileService() {

    override fun onStartListening() {
        super.onStartListening()

        updateTile()
    }

    override fun onClick() {
        super.onClick()

        val tile = qsTile

        if (tile.state == Tile.STATE_ACTIVE) {
            tile.state = Tile.STATE_INACTIVE
            tile.label = "SafeLens OFF"
        } else {
            tile.state = Tile.STATE_ACTIVE
            tile.label = "SafeLens ON"
        }

        tile.updateTile()
    }

    private fun updateTile() {
        val tile = qsTile

        tile.state = Tile.STATE_INACTIVE
        tile.label = "SafeLens OFF"

        tile.updateTile()
    }
}