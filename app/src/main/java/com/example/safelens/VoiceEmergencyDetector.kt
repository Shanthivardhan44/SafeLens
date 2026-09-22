package com.example.safelens

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer

class VoiceEmergencyDetector(
    private val context: Context,
    private val onEmergencyDetected: () -> Unit
) {

    private var speechRecognizer: SpeechRecognizer? = null

    private var isListening = false

    private val emergencyPhrases = listOf(
        "i am unsafe",
        "i'm unsafe",
        "i am in danger",
        "i'm in danger",
        "help",
        "help help",
        "save me",
        "please help"
    )

    fun start() {

        if (speechRecognizer != null) {
            return
        }

        if (!SpeechRecognizer.isRecognitionAvailable(context)) {
            return
        }

        speechRecognizer =
            SpeechRecognizer.createSpeechRecognizer(context)

        speechRecognizer?.setRecognitionListener(
            object : RecognitionListener {

                override fun onResults(results: Bundle?) {

                    isListening = false

                    val matches =
                        results?.getStringArrayList(
                            SpeechRecognizer.RESULTS_RECOGNITION
                        )

                    matches?.forEach { result ->

                        val text =
                            result.lowercase().trim()

                        val emergencyDetected =
                            emergencyPhrases.any { phrase ->
                                text.contains(phrase)
                            }

                        if (emergencyDetected) {

                            onEmergencyDetected()

                            return
                        }
                    }

                    restartListening()
                }

                override fun onError(error: Int) {

                    isListening = false

                    restartListening()
                }

                override fun onReadyForSpeech(
                    params: Bundle?
                ) {
                }

                override fun onBeginningOfSpeech() {
                }

                override fun onRmsChanged(
                    rmsdB: Float
                ) {
                }

                override fun onBufferReceived(
                    buffer: ByteArray?
                ) {
                }

                override fun onEndOfSpeech() {
                }

                override fun onPartialResults(
                    partialResults: Bundle?
                ) {
                }

                override fun onEvent(
                    eventType: Int,
                    params: Bundle?
                ) {
                }
            }
        )

        startListening()
    }

    private fun startListening() {

        if (isListening) {
            return
        }

        val intent =
            Intent(
                RecognizerIntent.ACTION_RECOGNIZE_SPEECH
            ).apply {

                putExtra(
                    RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
                )

                putExtra(
                    RecognizerIntent.EXTRA_PARTIAL_RESULTS,
                    true
                )
            }

        try {

            speechRecognizer?.startListening(intent)

            isListening = true

        } catch (exception: Exception) {

            isListening = false
        }
    }

    private fun restartListening() {

        if (speechRecognizer == null) {
            return
        }

        speechRecognizer?.cancel()

        isListening = false

        startListening()
    }

    fun stop() {

        isListening = false

        speechRecognizer?.stopListening()

        speechRecognizer?.cancel()

        speechRecognizer?.destroy()

        speechRecognizer = null
    }
}