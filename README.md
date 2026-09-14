🛡️ SafeLens

SafeLens is a phone-native, privacy-first personal safety mode that works through Android Quick Settings.

It is designed for people who may be traveling alone or facing a potentially unsafe situation, with primary use cases including women, students, commuters, and solo travelers.

SafeLens is not a conventional emergency app. It is designed as a Quick Settings safety feature, similar to other phone-level controls that users can access directly from the system Quick Settings panel.

💡 Concept

SafeLens can be activated from Android Quick Settings, similar to Wi-Fi, Bluetooth, Mobile Data, or Location.

🛡️ SafeLens OFF
       ↓
User turns SafeLens ON
       ↓
SafeLens safety mode becomes active

When the user says:

"I am unsafe"

SafeLens immediately displays a safety check-in.

⚠️ SafeLens

You said you are unsafe.

Are you okay?

🟢 SAFE

🟡 BAD / NEED HELP

🔴 DANGER

At the same time, a 10-minute safety window begins.

During these 10 minutes, SafeLens performs two checks in parallel:

Waits for the user's SAFE / BAD / DANGER response.
Detects predefined emergency voice phrases such as:
"HELP!"
"HELP HELP!"
"SAVE ME!"
"PLEASE HELP!"

If danger is detected through either channel, SafeLens immediately escalates the safety event.

If the user confirms SAFE, the current safety event ends.

If there is no response and no emergency voice signal for the complete 10-minute window, the current safety session ends without sending an emergency alert or location.

🔄 Safety Flow
🛡️ SafeLens ON
       ↓
User says "I am unsafe"
       ↓
⚠️ IMMEDIATE SAFETY POPUP
       ↓
10-MINUTE SAFETY WINDOW
       ↓
 ┌───────────────────────┬────────────────────────┐
 │                       │                        │
 ▼                       ▼                        ▼
Popup Response       Emergency Voice          10-Minute
SAFE/BAD/DANGER      Detection                Timer
 │                       │                        │
 └───────────────┬───────┘                        │
                 ↓                                │
          Safety Decision                         │
                 ↓                                │
       ┌─────────┼─────────┐                      │
       ▼         ▼         ▼                      │
    🟢 SAFE   🟡 BAD    🔴 DANGER                 │
                │         │                       │
                └────┬────┘                       │
                     ↓                            │
               📍 Get Location                    │
                     ↓                            │
                ☁️ Backend                        │
                     ↓                            │
          ┌──────────┴──────────┐                 │
          ▼                     ▼                 │
   👨‍👩‍👧 Trusted Contacts   🚨 Response Dashboard │
                                                  │
                         No response + no voice ──┘
                                  ↓
                         🛑 End Safety Session
                                  ↓
                         No alert / No location
🏗️ System Architecture
                         📱 ANDROID PHONE
                                │
                                ▼
                    ┌─────────────────────┐
                    │   Quick Settings    │
                    │     🛡️ SafeLens      │
                    │      ON / OFF       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   TileService       │
                    │ Quick Settings Tile │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ SafeLens Controller  │
                    │  Safety Session      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Active Safety       │
                    │ Session / Service   │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        🎙️ Voice Detection            ⏱️ 10-Minute
        "I am unsafe"                  Safety Window
                 │                           │
                 └─────────────┬─────────────┘
                               ↓
                    ⚠️ Immediate Safety Popup
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
          Safety Check-in             Emergency Voice
                                      Detection
                 │                           │
                 └─────────────┬─────────────┘
                               ↓
                    ┌─────────────────────┐
                    │  Safety Decision     │
                    │      Engine          │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
          🟢 SAFE          🟡 BAD             🔴 DANGER
             │                 │                 │
             ▼                 └────────┬────────┘
       End Session                     ▼
                                📍 Location Service
                                        │
                                        ▼
                                  ☁️ Backend API
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                              ▼                   ▼
                       👨‍👩‍👧 Trusted         🚨 Emergency
                         Contacts              Response
                                               Dashboard
🔄 Safety State Flow
🛡️ SAFELENS OFF
       │
       │ User activates from Quick Settings
       ▼
🛡️ SAFELENS ON
       │
       │ User says "I am unsafe"
       ▼
⚠️ IMMEDIATE SAFETY POPUP
       │
       ▼
⏱️ 10-MINUTE SAFETY WINDOW
       │
       ├──────────────────────┐
       │                      │
       ▼                      ▼
Popup Response          Emergency Voice
       │                   Detection
       │                      │
       └──────────┬───────────┘
                  ▼
           Decision Engine
                  │
       ┌──────────┼──────────┐
       │          │          │
       ▼          ▼          ▼
    🟢 SAFE    🟡 BAD     🔴 DANGER
       │          │          │
       ▼          └────┬─────┘
 End Session           ▼
                  📍 Location
                       │
                       ▼
                  ☁️ Backend
                       │
                ┌──────┴──────┐
                ▼             ▼
             Family       Response
                           Dashboard
🎙️ Dual-Channel Safety Monitoring

During the 10-minute safety window, SafeLens performs two safety checks simultaneously.

1. User Safety Check-in

The user can respond directly to the safety popup.

Response	Action
🟢 SAFE	End the current safety event
🟡 BAD / NEED HELP	Start assistance and location sharing
🔴 DANGER	Immediately trigger emergency escalation
2. Emergency Voice Detection

SafeLens detects a small predefined vocabulary of emergency phrases during the active safety session.

Example phrases:

"HELP!"
"HELP HELP!"
"SAVE ME!"
"PLEASE HELP!"

If an emergency phrase is detected:

🎙️ Emergency Voice Detected
          ↓
     🔴 DANGER
          ↓
 Immediate Escalation
          ↓
     📍 Get Location
          ↓
      ☁️ Backend
          ↓
👨‍👩‍👧 Trusted Contacts
          +
🚨 Response Dashboard

The prototype focuses on predefined emergency phrases rather than attempting to classify every type of shouting or distress sound.

⏱️ 10-Minute Safety Window

The 10-minute window begins after the immediate safety popup is displayed.

During this period:

                 10-MINUTE WINDOW
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
      Popup Response          Emergency Voice
      SAFE/BAD/DANGER         Detection
             │                       │
             └───────────┬───────────┘
                         ▼
                  Decision Engine
SAFE
🟢 SAFE
   ↓
End current safety event
   ↓
No emergency location sharing
BAD / NEED HELP
🟡 BAD / NEED HELP
        ↓
📍 Get Location
        ↓
☁️ Backend
        ↓
👨‍👩‍👧 Trusted Contacts
        +
🚨 Response Dashboard
DANGER
🔴 DANGER
     ↓
Immediate escalation
     ↓
📍 Get Location
     ↓
☁️ Backend
     ↓
👨‍👩‍👧 Trusted Contacts
     +
🚨 Response Dashboard
Emergency Voice Detected
🎙️ "HELP!"
       ↓
🔴 DANGER
       ↓
Immediate escalation
       ↓
📍 Get Location
       ↓
👨‍👩‍👧 Trusted Contacts
       +
🚨 Response Dashboard
🛑 No Response Scenario

If:

The user does not select SAFE
The user does not select BAD / NEED HELP
The user does not select DANGER
No emergency voice phrase is detected

then after 10 minutes:

⏱️ 10 Minutes Completed
          ↓
🛑 Current Safety Session Ends
          ↓
❌ No Danger Alert
❌ No Location Sharing
❌ No Family Notification
❌ No Response Dashboard Alert

The SafeLens Quick Settings mode can remain ON. Only the current safety session ends.

The user can manually turn SafeLens OFF from Quick Settings.

📍 Location & Emergency Architecture

Location is not continuously shared simply because SafeLens is ON.

Location sharing is triggered only when:

🟡 BAD / NEED HELP

OR

🔴 DANGER

OR

🎙️ Emergency Voice Detected

Then:

📱 Android Phone
       ↓
📍 Location Service
       ↓
☁️ SafeLens Backend
       ↓
 ┌─────┴───────────────┐
 ▼                     ▼
👨‍👩‍👧 Trusted        🚨 Emergency
Contacts              Response
                      Dashboard

For the prototype, the Emergency Response Dashboard represents the emergency-response side of the system.

Direct integration with real police or government emergency systems would require authorized institutional APIs or integrations.

🧠 AI / Voice Architecture

SafeLens is designed to prioritize on-device voice processing to reduce unnecessary transmission of audio.

🎙️ Microphone
      ↓
Audio Processing
      ↓
Speech / Keyword Detection
      ↓
Emergency Phrase Detection
      │
      ├── Normal speech
      │       ↓
      │     Ignore
      │
      └── Emergency phrase
              ↓
          🔴 DANGER

The initial prototype uses a small predefined vocabulary:

HELP
HELP HELP
SAVE ME
PLEASE HELP

Future versions may use a lightweight on-device acoustic/keyword model to improve detection.

Raw audio should not be uploaded to the backend as part of the normal emergency workflow.

🧩 Core Components
📱 Android / Phone
Quick Settings TileService
SafeLens Controller
Safety Session Manager
Safety State Machine
Foreground Service where required
Microphone handling
Emergency voice detection
Location Service
Safety notification / popup
Timer management
🧠 AI / Voice
On-device speech/keyword detection
Predefined emergency vocabulary
Lightweight voice model
Local processing
Optional device-specific AI/NPU optimization in future versions
☁️ Backend
Emergency event API
User management
Trusted contact management
Location updates
Emergency event storage
Authentication
Real-time communication
🚨 Emergency Response Dashboard
Active emergency events
User safety status
Current location
Event timestamp
Assistance requests
Emergency status
Live/periodic location updates
🛠️ Technology Stack
Mobile
Kotlin
Android SDK
Android Quick Settings TileService
Android Foreground Services
Android Location Services
Android Notifications
AI
On-device speech/keyword detection
Lightweight ML / keyword detection
Optional device-specific AI/NPU optimization
Backend
REST API
Database
Authentication
Real-time communication
Dashboard
React
JavaScript
HTML
CSS
Map integration
📁 Project Structure
SafeLens/
│
├── android/
│   └── SafeLens Android project
│
├── ai/
│   ├── models/
│   └── voice_detection/
│
├── backend/
│   ├── api/
│   └── database/
│
├── dashboard/
│   └── emergency-response-dashboard/
│
├── docs/
│   ├── architecture/
│   └── diagrams/
│
├── prototype/
│   └── demo-assets/
│
├── README.md
├── .gitignore
└── LICENSE
🔐 Privacy

Privacy is a core principle of SafeLens.

Normal State
🛡️ SafeLens OFF
       ↓
No safety monitoring
       ↓
No location sharing
SafeLens Active
🛡️ SafeLens ON
       ↓
Ready for safety activation

After the user says:

"I am unsafe"

an active safety session begins.

"I am unsafe"
       ↓
Immediate Safety Popup
       ↓
10-Minute Safety Window
       ↓
On-device emergency voice detection
Emergency State
🔴 Emergency detected
       ↓
📍 Location requested
       ↓
☁️ Required emergency information shared

Location is not continuously transmitted simply because SafeLens is enabled.

If the 10-minute session ends normally:

Session ends
     ↓
No emergency event
     ↓
No location sharing
     ↓
No emergency notification
⚠️ Android Technical Constraints

SafeLens is designed around Android's security and privacy restrictions.

Android supports custom Quick Settings tiles through TileService. The tile itself should be treated as the control point for SafeLens, rather than assuming the tile service continuously runs all safety logic.

Microphone access requires appropriate Android permissions and foreground-service configuration. Modern Android also restricts starting microphone-related foreground services from the background. Therefore, the prototype will use Android-permitted microphone and foreground-service mechanisms rather than assuming unrestricted hidden background microphone access.

The implementation will be tested on the target iQOO device to verify:

Quick Settings behavior
Microphone permissions
Foreground-service behavior
Screen-lock behavior
Location access
Notifications
Battery/background restrictions
Network interruptions
🚧 Project Status

Prototype — Under Development

Current Goal

Build a working end-to-end demonstration of:

Quick Settings
      ↓
🛡️ SafeLens ON
      ↓
"I am unsafe"
      ↓
⚠️ Immediate Safety Popup
      ↓
⏱️ 10-Minute Safety Window
      ↓
 ┌───────────────────┬────────────────────┐
 │                   │                    │
 ▼                   ▼                    ▼
🟢 SAFE          🟡 BAD / HELP       🔴 DANGER
 │                   │                    │
 ▼                   └─────────┬──────────┘
End Session                    ▼
                         📍 Location
                              ↓
                         ☁️ Backend
                              ↓
                   🚨 Response Dashboard

At the same time:

10-Minute Safety Window
          │
          ▼
Emergency Voice Detection
          │
          ▼
"HELP!" / "SAVE ME!"
          │
          ▼
🔴 DANGER
          │
          ▼
📍 Location + Emergency Alert
🌟 Core Innovation

SafeLens combines a phone-native Quick Settings safety mode, an immediate safety check-in, and time-limited emergency voice detection into a privacy-first safety mechanism.

Unlike a conventional emergency button that requires a direct emergency action, SafeLens provides a dual-channel safety mechanism:

                SafeLens
                   │
       ┌───────────┴───────────┐
       │                       │
       ▼                       ▼
User Check-in             Emergency Voice
SAFE/BAD/DANGER           HELP/SAVE ME
       │                       │
       └───────────┬───────────┘
                   ▼
            Safety Decision
                   │
                   ▼
            Progressive Help

The user can explicitly request assistance through the popup, while predefined emergency voice phrases can trigger escalation when the user cannot interact with the phone.

🎯 Prototype Roadmap

Android Quick Settings Tile

SafeLens ON/OFF

SafeLens state management

"I am unsafe" detection

Immediate safety popup

10-minute safety timer

SAFE / BAD / DANGER states

Emergency voice phrase detection

Emergency escalation

Location service

Backend emergency API

Trusted contact notification

Emergency response dashboard

Periodic/live location updates after escalation

End-to-end prototype demonstration

Testing on target iQOO device

👥 Team Responsibilities
Member 1 — Android / Device
android/
ai/

Responsible for:

Quick Settings Tile
SafeLens activation
Voice trigger
Safety popup
10-minute safety session
Emergency voice detection
Safety state machine
GPS/location
Android permissions and services
Member 2 — Backend / Dashboard
backend/
dashboard/

Responsible for:

Backend API
Database
Trusted contacts
Emergency event management
Notifications
Emergency response dashboard
Map/location visualization
Real-time/periodic location updates
Both Members
Integration
Device testing
Bug fixing
Demo preparation
Presentation
Documentation
🚀 Final Prototype Demo

The final demonstration will show:

1. User turns ON 🛡️ SafeLens
              ↓
2. User says "I am unsafe"
              ↓
3. Immediate safety popup appears
              ↓
4. 10-minute safety window starts
              ↓
5. Popup response + emergency voice detection
   run in parallel
              ↓
6. User selects BAD
   OR
   "HELP HELP!" is detected
              ↓
7. System escalates to DANGER
              ↓
8. GPS location is obtained
              ↓
9. Emergency information is sent
              ↓
10. Family/trusted contact receives alert
              ↓
11. Emergency Response Dashboard
    displays the active event and location
🏁 Vision

SafeLens aims to make personal safety a phone-level capability, accessible directly from Quick Settings, while minimizing unnecessary location and audio data sharing.

The goal is not to continuously track the user.

The goal is to provide short, privacy-aware, progressive protection when the user indicates that something may be wrong.
