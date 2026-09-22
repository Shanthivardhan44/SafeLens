package com.example.safelens

import android.content.Context

object SafeLensState {

    private const val PREFS_NAME = "safelens_state"

    private const val KEY_ENABLED = "enabled"
    private const val KEY_SESSION_ACTIVE = "session_active"

    // ---------------------------------------------------------
    // SAFELENS ON / OFF
    // ---------------------------------------------------------

    fun isEnabled(context: Context): Boolean {

        return context
            .getSharedPreferences(
                PREFS_NAME,
                Context.MODE_PRIVATE
            )
            .getBoolean(
                KEY_ENABLED,
                false
            )
    }

    fun setEnabled(
        context: Context,
        enabled: Boolean
    ) {

        context
            .getSharedPreferences(
                PREFS_NAME,
                Context.MODE_PRIVATE
            )
            .edit()
            .putBoolean(
                KEY_ENABLED,
                enabled
            )
            .apply()
    }

    fun toggle(
        context: Context
    ): Boolean {

        val newState =
            !isEnabled(context)

        setEnabled(
            context,
            newState
        )

        return newState
    }

    // ---------------------------------------------------------
    // SAFETY SESSION ON / OFF
    // ---------------------------------------------------------

    fun isSessionActive(
        context: Context
    ): Boolean {

        return context
            .getSharedPreferences(
                PREFS_NAME,
                Context.MODE_PRIVATE
            )
            .getBoolean(
                KEY_SESSION_ACTIVE,
                false
            )
    }

    fun setSessionActive(
        context: Context,
        active: Boolean
    ) {

        context
            .getSharedPreferences(
                PREFS_NAME,
                Context.MODE_PRIVATE
            )
            .edit()
            .putBoolean(
                KEY_SESSION_ACTIVE,
                active
            )
            .apply()
    }
}