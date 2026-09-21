package com.example.safelens

import android.os.CountDownTimer

object SafetyCheckInManager {

    private const val CHECK_IN_DURATION = 10 * 60 * 1000L
    private const val COUNTDOWN_INTERVAL = 1000L

    private var timer: CountDownTimer? = null

    var isRunning: Boolean = false
        private set

    var remainingTimeMillis: Long = CHECK_IN_DURATION
        private set

    var selectedStatus: SafetyStatus? = null
        private set

    fun start(
        onTick: (Long) -> Unit,
        onFinished: () -> Unit
    ) {

        stop()

        selectedStatus = null
        isRunning = true
        remainingTimeMillis = CHECK_IN_DURATION

        timer = object : CountDownTimer(
            CHECK_IN_DURATION,
            COUNTDOWN_INTERVAL
        ) {

            override fun onTick(
                millisUntilFinished: Long
            ) {

                remainingTimeMillis =
                    millisUntilFinished

                onTick(millisUntilFinished)
            }

            override fun onFinish() {

                isRunning = false
                remainingTimeMillis = 0L

                timer = null

                onFinished()
            }
        }.start()
    }

    fun selectStatus(
        status: SafetyStatus
    ) {

        selectedStatus = status
    }

    fun extend(
        additionalMinutes: Int,
        onTick: (Long) -> Unit,
        onFinished: () -> Unit
    ) {

        val additionalTime =
            additionalMinutes * 60 * 1000L

        val newDuration =
            remainingTimeMillis +
                    additionalTime

        timer?.cancel()

        isRunning = true

        timer = object : CountDownTimer(
            newDuration,
            COUNTDOWN_INTERVAL
        ) {

            override fun onTick(
                millisUntilFinished: Long
            ) {

                remainingTimeMillis =
                    millisUntilFinished

                onTick(millisUntilFinished)
            }

            override fun onFinish() {

                isRunning = false
                remainingTimeMillis = 0L

                timer = null

                onFinished()
            }
        }.start()
    }

    fun stop() {

        timer?.cancel()

        timer = null

        isRunning = false
    }
}

enum class SafetyStatus {
    SAFE,
    BAD,
    DANGER
}