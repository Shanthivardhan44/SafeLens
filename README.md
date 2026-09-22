# 🛡️ SafeLens

**SafeLens is a phone-native, privacy-first personal safety mode that works through Android Quick Settings.**

It is designed for people who may be traveling alone or facing a potentially unsafe situation, with primary use cases including women, students, commuters, and solo travelers.

SafeLens is **not a conventional emergency app**. It is designed as a **Quick Settings safety feature**, similar to other phone-level controls that users can access directly from the system Quick Settings panel.

---

# 💡 Concept

SafeLens can be activated from **Android Quick Settings**, similar to Wi-Fi, Bluetooth, Mobile Data, or Location.

```text
🛡️ SafeLens OFF
       ↓
User turns SafeLens ON
       ↓
🛡️ SafeLens safety mode becomes active
       ↓
🎙️ Microphone remains OFF
```

### 🔐 Important Privacy Rule

Turning SafeLens ON **does not automatically activate the microphone**.

The microphone remains OFF until the user **explicitly starts a Safety Session**.

```text
🛡️ SafeLens ON
       ↓
🎙️ Microphone OFF
       ↓
User explicitly starts Safety Session
       ↓
🎙️ Microphone temporarily ON
```

When the Safety Session ends, the microphone is turned OFF again.

---

# 🚨 Safety Trigger

After explicitly starting a Safety Session, the user can indicate that something is wrong using **voice OR text**.

### 🎙️ Voice Trigger

The user can say:

```text
"I am unsafe"
```

### ⌨️ Text Trigger

The user can also enter:

```text
I am unsafe
```

Both triggers activate the same safety protocol.

```text
             Safety Session
                    ↓
          ┌─────────┴─────────┐
          ↓                   ↓
      🎙️ Voice             ⌨️ Text
   "I am unsafe"         "I am unsafe"
          │                   │
          └─────────┬─────────┘
                    ↓
           ⚠️ Immediate Popup
```

The text trigger does **not** require microphone activation.

---

# ⚠️ Immediate Safety Check

When SafeLens receives:

> **"I am unsafe"**

through voice or text, it immediately displays a safety check-in.

```text
⚠️ SafeLens

You said you are unsafe.

Are you okay?

🟢 SAFE

🟡 BAD / NEED HELP

🔴 DANGER
```

The popup is **immediate**.

The 10-minute period described below is the response and emergency-monitoring window; it is **not a delay before showing the popup**.

---

# ⏱️ 10-Minute Safety Window

At the same time as the immediate popup, a **10-minute safety window** begins.

During these 10 minutes, SafeLens performs two checks in parallel:

```text
                 ⏱️ 10-MINUTE WINDOW
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
       User Popup Response    Emergency Voice
       SAFE/BAD/DANGER         Detection
              │                     │
              └──────────┬──────────┘
                         ↓
                  Safety Decision
```

### 1. User Safety Check-in

The system waits for:

```text
🟢 SAFE
🟡 BAD / NEED HELP
🔴 DANGER
```

### 2. Emergency Voice Detection

During the active Safety Session, SafeLens can detect predefined emergency phrases such as:

```text
"HELP!"
"HELP HELP!"
"SAVE ME!"
"PLEASE HELP!"
```

If an emergency phrase is detected, SafeLens immediately escalates to:

```text
🔴 DANGER
```

---

# 🔄 Complete Safety Flow

```text
🛡️ SafeLens ON
       ↓
🎙️ Microphone OFF
       ↓
User explicitly starts Safety Session
       ↓
🎙️ Microphone temporarily ON
       ↓
┌─────────────────────────────┐
│                             │
↓                             ↓
🎙️ Voice                    ⌨️ Text
"I am unsafe"              "I am unsafe"
│                             │
└──────────────┬──────────────┘
               ↓
      ⚠️ IMMEDIATE SAFETY POPUP
               ↓
       🟢 SAFE
       🟡 BAD / NEED HELP
       🔴 DANGER
               ↓
       ⏱️ 10-MINUTE WINDOW
               ↓
     ┌─────────┴─────────┐
     ↓                   ↓
Popup Response     Emergency Voice
                   Detection
     ↓                   ↓
     └─────────┬─────────┘
               ↓
        Safety Decision
               ↓
      ┌────────┼────────┐
      ↓        ↓        ↓
    SAFE      BAD     DANGER
               │        │
               └───┬────┘
                   ↓
                📍 GPS
                   ↓
             ☁️ Backend
             ↙          ↘
      👨‍👩‍👧 Trusted    🚨 Response
         Contacts       Dashboard
                   ↓
          Live / Periodic Location
                   ↓
        Safety Session Completed
                   ↓
             🎙️ Microphone OFF
```

---

# 🏗️ System Architecture

```text
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
                     │    TileService      │
                     │ Quick Settings Tile │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ SafeLens Controller │
                     │  Safety Session     │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Active Safety       │
                     │ Session / Service   │
                     └──────────┬──────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
             🎙️ Voice Detection       ⌨️ Text Input
                    │                       │
                    └───────────┬───────────┘
                                ↓
                         "I am unsafe"
                                ↓
                    ⚠️ Immediate Safety Popup
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
             Safety Check-in        Emergency Voice
             SAFE/BAD/DANGER          Detection
                    │                       │
                    └───────────┬───────────┘
                                ↓
                     ┌─────────────────────┐
                     │  Safety Decision     │
                     │      Engine          │
                     └──────────┬──────────┘
                                │
                  ┌─────────────┼─────────────┐
                  │             │             │
                  ▼             ▼             ▼
               🟢 SAFE      🟡 NEED HELP    🔴 DANGER
                  │             │             │
                  ▼             └──────┬──────┘
             End Event                 ↓
                                📍 Location Service
                                        │
                                        ▼
                                   ☁️ Backend
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                              ▼                   ▼
                       👨‍👩‍👧 Trusted       🚨 Emergency
                          Contacts            Response
                                              Dashboard
```

---

# 🔄 Safety State Flow

```text
🛡️ SAFELENS OFF
       │
       │ User activates from Quick Settings
       ▼
🛡️ SAFELENS ON
       │
       │ 🎙️ Microphone remains OFF
       │
       │ User explicitly starts Safety Session
       ▼
🟢 SAFETY SESSION ACTIVE
       │
       │ 🎙️ Microphone temporarily ON
       │
       ├───────────────┐
       │               │
       ▼               ▼
🎙️ Voice            ⌨️ Text
"I am unsafe"       "I am unsafe"
       │               │
       └───────┬───────┘
               ↓
       ⚠️ IMMEDIATE POPUP
               ↓
       ⏱️ 10-MINUTE WINDOW
               │
       ┌───────┴────────┐
       ↓                ↓
  Popup Response    Emergency Voice
       │                │
       └───────┬────────┘
               ↓
        Decision Engine
               │
       ┌───────┼───────┐
       ↓       ↓       ↓
    🟢 SAFE   🟡 BAD   🔴 DANGER
       │       │       │
       ▼       └───┬───┘
   End Event        ↓
                📍 Location
                    │
                    ▼
                ☁️ Backend
                    │
             ┌──────┴──────┐
             ▼             ▼
          Family       Response
                       Dashboard
                    │
                    ▼
             Live / Periodic
             Location Sharing
                    │
                    ▼
             Session Complete
                    │
                    ▼
              🎙️ Microphone OFF
```

---

# 🎙️ Dual-Channel Safety Monitoring

During the 10-minute safety window, SafeLens performs **two safety checks simultaneously**.

## 1. User Safety Check-in

The user can respond directly to the safety popup.

| Response           | Action                                   |
| ------------------ | ---------------------------------------- |
| 🟢 SAFE            | End the current safety event             |
| 🟡 BAD / NEED HELP | Start assistance and location sharing    |
| 🔴 DANGER          | Immediately trigger emergency escalation |

---

## 2. Emergency Voice Detection

SafeLens detects a small predefined vocabulary of emergency phrases during the active Safety Session.

Example phrases:

```text
"HELP!"
"HELP HELP!"
"SAVE ME!"
"PLEASE HELP!"
```

If an emergency phrase is detected:

```text
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
          ↓
   Live / Periodic Location
```

The prototype focuses on **predefined emergency phrases** rather than attempting to classify every type of shouting or distress sound.

---

# ⏱️ 10-Minute Safety Window

The 10-minute window begins **after the immediate safety popup is displayed**.

During this period:

```text
                  10-MINUTE WINDOW
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       Popup Response        Emergency Voice
       SAFE/BAD/DANGER        Detection
              │                     │
              └──────────┬──────────┘
                         ↓
                   Decision Engine
```

## 🟢 SAFE

```text
🟢 SAFE
   ↓
End current safety event
   ↓
No emergency location sharing
   ↓
Microphone OFF
```

---

## 🟡 BAD / NEED HELP

```text
🟡 BAD / NEED HELP
        ↓
📍 Get Location
        ↓
☁️ Backend
        ↓
👨‍👩‍👧 Trusted Contacts
        +
🚨 Response Dashboard
        ↓
Live / Periodic Location
```

---

## 🔴 DANGER

```text
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
     ↓
Live / Periodic Location
```

---

## 🎙️ Emergency Voice Detected

```text
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
       ↓
Live / Periodic Location
```

---

# 🛑 No Response Scenario

If:

* The user does not select SAFE
* The user does not select BAD / NEED HELP
* The user does not select DANGER
* No emergency voice phrase is detected

then after 10 minutes:

```text
⏱️ 10 Minutes Completed
          ↓
🛑 Current Safety Session Ends
          ↓
🎙️ Microphone OFF
          ↓
❌ No Danger Alert
❌ No Location Sharing
❌ No Family Notification
❌ No Response Dashboard Alert
```

The **SafeLens Quick Settings mode can remain ON**.

Only the current Safety Session ends.

The user can manually turn SafeLens OFF from Quick Settings.

---

# 📍 Location & Emergency Architecture

Location is **not continuously shared simply because SafeLens is ON**.

Location sharing is triggered only when:

```text
🟡 BAD / NEED HELP

OR

🔴 DANGER

OR

🎙️ Emergency Voice Detected
```

Then:

```text
📱 Android Phone
       ↓
📍 Location Service
       ↓
☁️ SafeLens Backend
       ↓
┌──────┴────────────────┐
▼                       ▼
👨‍👩‍👧 Trusted        🚨 Emergency
Contacts              Response
                      Dashboard
```

For the prototype, the Emergency Response Dashboard represents the emergency-response side of the system.

Direct integration with real police or government emergency systems would require authorized institutional APIs or integrations.

---

# 🧠 AI / Voice Architecture

SafeLens is designed to prioritize **on-device voice processing** to reduce unnecessary transmission of audio.

```text
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
```

The initial prototype uses a **small predefined vocabulary**:

```text
HELP
HELP HELP
SAVE ME
PLEASE HELP
```

Future versions may use a lightweight on-device acoustic/keyword model to improve detection.

**Raw audio should not be uploaded to the backend as part of the normal emergency workflow.**

---

# ⌨️ Text Trigger Architecture

Text input provides an alternative when speaking is not practical.

```text
⌨️ User enters:

"I am unsafe"
       ↓
Safety Trigger
       ↓
⚠️ Immediate Popup
       ↓
⏱️ 10-Minute Safety Window
```

The text trigger does not require microphone access.

```text
Text Trigger
     ↓
🎙️ Microphone
     ↓
OFF
```

---

# 🔐 Microphone Lifecycle

The microphone follows a strict lifecycle.

```text
┌───────────────────────────────┐
│ SafeLens OFF                  │
│ 🎙️ Microphone OFF             │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│ SafeLens ON                   │
│ 🎙️ Microphone OFF             │
└───────────────┬───────────────┘
                ↓
      User explicitly starts
        Safety Session
                ↓
┌───────────────────────────────┐
│ Safety Session ACTIVE         │
│ 🎙️ Microphone temporarily ON  │
└───────────────┬───────────────┘
                ↓
     Session completed /
     cancelled / timeout
                ↓
┌───────────────────────────────┐
│ 🎙️ Microphone OFF             │
└───────────────────────────────┘
```

This prevents SafeLens from behaving like an always-listening microphone service merely because the Quick Settings tile is enabled.

---

# 🧩 Core Components

## 📱 Android / Phone

* Quick Settings `TileService`
* SafeLens Controller
* Safety Session Manager
* Safety State Machine
* Foreground Service where required
* Microphone handling
* Emergency voice detection
* Text trigger
* Location Service
* Safety notification / popup
* Timer management

---

## 🧠 AI / Voice

* On-device speech/keyword detection
* Predefined emergency vocabulary
* Lightweight voice model
* Local processing
* Optional device-specific AI/NPU optimization in future versions

---

## ⌨️ Text Processing

* Text safety trigger
* `"I am unsafe"` detection
* Local trigger processing
* Same safety state machine as voice input

---

## ☁️ Backend

* Emergency event API
* User management
* Trusted contact management
* Location updates
* Emergency event storage
* Authentication
* Real-time communication

---

## 🚨 Emergency Response Dashboard

* Active emergency events
* User safety status
* Current location
* Event timestamp
* Assistance requests
* Emergency status
* Live/periodic location updates

---

# 🛠️ Technology Stack

## Mobile

* **Kotlin**
* **Android SDK**
* Android Quick Settings `TileService`
* Android Foreground Services
* Android Location Services
* Android Notifications

## AI

* On-device speech/keyword detection
* Lightweight ML / keyword detection
* Optional device-specific AI/NPU optimization

## Backend

* REST API
* Database
* Authentication
* Real-time communication

## Dashboard

* React
* JavaScript
* HTML
* CSS
* Map integration

---

# 📁 Project Structure

```text
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
```

---

# 🔐 Privacy

Privacy is a core principle of SafeLens.

## Normal State

```text
🛡️ SafeLens OFF
       ↓
No safety monitoring
       ↓
No location sharing
       ↓
🎙️ Microphone OFF
```

---

## SafeLens Active

```text
🛡️ SafeLens ON
       ↓
Ready for Safety Session
       ↓
🎙️ Microphone OFF
```

SafeLens does **not** activate the microphone simply because the Quick Settings tile is ON.

---

## Safety Session

After the user explicitly starts a Safety Session:

```text
🟢 Safety Session Started
       ↓
🎙️ Microphone temporarily ON
       ↓
Voice / Text trigger
       ↓
"I am unsafe"
       ↓
Immediate Safety Popup
       ↓
10-Minute Safety Window
```

---

## Emergency State

```text
🔴 Emergency detected
       ↓
📍 Location requested
       ↓
☁️ Required emergency information shared
```

Location is not continuously transmitted simply because SafeLens is enabled.

---

## Session Completion

```text
Session ends
     ↓
🎙️ Microphone OFF
     ↓
No emergency event
     ↓
No location sharing
     ↓
No emergency notification
```

---

# 🌐 Offline-First Design

SafeLens is designed with an **offline-first philosophy**.

Core safety logic can operate locally where platform support allows:

```text
Quick Settings
      ↓
Safety Session
      ↓
Voice / Text Trigger
      ↓
Immediate Popup
      ↓
Timer
      ↓
Decision Engine
```

Internet connectivity is primarily required for remote communication:

```text
Backend
Trusted Contacts
Emergency Dashboard
Remote Location Updates
```

GPS/GNSS location acquisition can work without internet on supported devices, while transmitting that location remotely requires connectivity.

---

# 📡 Connectivity Model

```text
                    SafeLens
                       │
              ┌────────┴────────┐
              ↓                 ↓
           OFFLINE            ONLINE
              │                 │
              ↓                 ↓
     Local safety logic      Backend
     Voice/Text trigger      Alerts
     Popup                   Dashboard
     Timer                   Remote Location
     Decision Engine
```

---

# ⚠️ Android Technical Constraints

SafeLens is designed around Android's security and privacy restrictions.

Android supports custom Quick Settings tiles through `TileService`.

The Quick Settings Tile should be treated as the **control point for SafeLens**, rather than assuming that the TileService continuously runs all safety logic.

Microphone access requires appropriate Android permissions and foreground-service configuration.

Modern Android versions also restrict background microphone-related foreground services.

Therefore, SafeLens will use **Android-permitted microphone and foreground-service mechanisms** rather than assuming unrestricted hidden background microphone access.

The prototype will be tested on the target iQOO device to verify:

* Quick Settings behavior
* Microphone permissions
* Foreground-service behavior
* Screen-lock behavior
* Location access
* Notifications
* Battery/background restrictions
* Network interruptions
* Safety Session lifecycle

---

# 🛡️ Security Principles

SafeLens follows these principles:

### 1. Explicit Microphone Activation

The microphone is not activated merely because SafeLens is enabled.

### 2. Limited Safety Session

Voice monitoring is limited to an explicitly started Safety Session.

### 3. Local Processing

Voice processing should happen locally/on-device where possible.

### 4. No Raw Audio Upload

Raw audio should not be uploaded during the normal emergency workflow.

### 5. Controlled Location Sharing

Location is shared only after an appropriate safety escalation.

### 6. User Visibility

The system should respect Android's permission indicators and privacy controls.

---

# 🚧 Project Status

**Prototype — Under Development**

## Current Goal

Build a working end-to-end demonstration of:

```text
Quick Settings
      ↓
🛡️ SafeLens ON
      ↓
🎙️ Microphone OFF
      ↓
User starts Safety Session
      ↓
🎙️ Microphone temporarily ON
      ↓
"I am unsafe"
      ↓
⚠️ Immediate Safety Popup
      ↓
⏱️ 10-Minute Safety Window
      ↓
┌─────────────────────────────────┐
│                                 │
▼                                 ▼
Voice                            Text
"I am unsafe"                    "I am unsafe"
│                                 │
└───────────────┬─────────────────┘
                ↓
       🟢 SAFE / 🟡 NEED HELP / 🔴 DANGER
                ↓
       Emergency Voice Detection
                ↓
             📍 Location
                ↓
           ☁️ Backend
                ↓
       🚨 Response Dashboard
                ↓
        🎙️ Microphone OFF
```

---

# 🌟 Core Innovation

> **SafeLens combines a phone-native Quick Settings safety mode, an explicit Safety Session, an immediate safety check-in, and time-limited emergency voice detection into a privacy-first safety mechanism.**

Unlike a conventional emergency button that requires a direct emergency action, SafeLens provides a **dual-input, dual-channel safety mechanism**.

```text
                    SafeLens
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
          🎙️ Voice           ⌨️ Text
       "I am unsafe"       "I am unsafe"
              │                 │
              └────────┬────────┘
                       ↓
              Immediate Check-in
                       ↓
            ┌──────────┼──────────┐
            ↓          ↓          ↓
         🟢 SAFE   🟡 NEED HELP  🔴 DANGER
                       │          │
                       └────┬─────┘
                            ↓
                         📍 GPS
                            ↓
                       ☁️ Backend
                      ↙          ↘
              👨‍👩‍👧 Contacts   🚨 Dashboard
```

During the active safety window:

```text
        ┌──────────────────────────────┐
        │      10-MINUTE WINDOW        │
        │                              │
        │  Popup Response              │
        │          +                   │
        │  Emergency Voice Detection   │
        │                              │
        └──────────────┬───────────────┘
                       ↓
                Safety Decision
```

The user can explicitly request assistance through the popup, while predefined emergency voice phrases can trigger escalation when the user cannot interact with the phone.

---

# 🎯 Why SafeLens is Different

A conventional emergency flow may look like:

```text
Press SOS
   ↓
Send Alert
   ↓
Share Location
```

SafeLens uses:

```text
Quick Settings
      ↓
SafeLens ON
      ↓
Explicit Safety Session
      ↓
"I am unsafe"
      ↓
Immediate Safety Check
      ↓
10-Minute Safety Window
      ↓
Popup + Emergency Voice Detection
      ↓
SAFE / NEED HELP / DANGER
      ↓
Progressive Escalation
      ↓
GPS + Trusted Contacts
      ↓
Emergency Response Dashboard
```

The key innovation is therefore the **structured safety protocol**, not simply sending a message to a family member.

---

# 🎯 Prototype Roadmap

* [ ] Android Quick Settings Tile
* [ ] SafeLens ON/OFF
* [ ] SafeLens state management
* [ ] Microphone OFF when SafeLens is merely ON
* [ ] Explicit Safety Session
* [ ] Temporary microphone activation during Safety Session
* [ ] `"I am unsafe"` voice detection
* [ ] `"I am unsafe"` text detection
* [ ] Immediate safety popup
* [ ] 10-minute safety timer
* [ ] SAFE / BAD / DANGER states
* [ ] Emergency voice phrase detection
* [ ] Emergency escalation
* [ ] Location service
* [ ] Backend emergency API
* [ ] Trusted contact notification
* [ ] Emergency Response Dashboard
* [ ] Periodic/live location updates after escalation
* [ ] Microphone OFF after session completion
* [ ] End-to-end prototype demonstration
* [ ] Testing on target iQOO device

---

# 👥 Team Responsibilities

## Member 1 — Android / Device

```text
android/
ai/
```

Responsible for:

* Quick Settings Tile
* SafeLens activation
* Safety Session
* Voice trigger
* Text trigger
* Safety popup
* 10-minute safety session
* Emergency voice detection
* Safety state machine
* GPS/location
* Android permissions and services
* Microphone lifecycle

---

## Member 2 — Backend / Dashboard

```text
backend/
dashboard/
```

Responsible for:

* Backend API
* Database
* Trusted contacts
* Emergency event management
* Notifications
* Emergency Response Dashboard
* Map/location visualization
* Real-time/periodic location updates

---

## Both Members

* Integration
* Device testing
* Bug fixing
* Demo preparation
* Presentation
* Documentation

---

# 📅 Suggested 12-Day Prototype Plan

| Day | Task                        |
| --- | --------------------------- |
| 1   | Android project setup       |
| 2   | Quick Settings Tile         |
| 3   | SafeLens state management   |
| 4   | Voice + text trigger        |
| 5   | Safety popup                |
| 6   | 10-minute timer             |
| 7   | Emergency keyword detection |
| 8   | Decision engine + GPS       |
| 9   | Backend                     |
| 10  | Emergency dashboard         |
| 11  | Full integration            |
| 12  | Testing + demo              |

A small buffer should be reserved for Android permission, foreground-service, and device-specific issues.

---

# 🚀 Final Prototype Demo

The final demonstration will show:

```text
1. User opens Android Quick Settings
                 ↓
2. User turns ON 🛡️ SafeLens
                 ↓
3. 🎙️ Microphone remains OFF
                 ↓
4. User explicitly starts Safety Session
                 ↓
5. 🎙️ Microphone temporarily ON
                 ↓
6. User says "I am unsafe"
   OR
   User enters "I am unsafe"
                 ↓
7. ⚠️ Immediate safety popup appears
                 ↓
8. ⏱️ 10-minute safety window starts
                 ↓
9. Popup response + emergency voice
   detection run in parallel
                 ↓
10. User selects BAD
    OR
    "HELP HELP!" is detected
                 ↓
11. System escalates to 🔴 DANGER
                 ↓
12. 📍 GPS location is obtained
                 ↓
13. Emergency information is sent
                 ↓
14. Trusted contact receives alert
                 ↓
15. Emergency Response Dashboard
    displays active event and location
                 ↓
16. Live / periodic location sharing
                 ↓
17. Safety Session ends
                 ↓
18. 🎙️ Microphone OFF
```

---

# 🧪 Example Scenarios

## Scenario 1 — User is Safe

```text
SafeLens ON
   ↓
Start Safety Session
   ↓
"I am unsafe"
   ↓
Immediate Popup
   ↓
🟢 SAFE
```

Result:

```text
Safety event ends
No emergency escalation
No emergency location sharing
Microphone OFF
```

---

## Scenario 2 — User Needs Help

```text
"I am unsafe"
   ↓
Immediate Popup
   ↓
🟡 NEED HELP
```

Result:

```text
📍 GPS
   ↓
☁️ Backend
   ↓
Trusted Contacts
   +
Emergency Dashboard
   ↓
Live / Periodic Location
```

---

## Scenario 3 — User is in Danger

```text
"I am unsafe"
   ↓
Immediate Popup
   ↓
🔴 DANGER
```

Result:

```text
Immediate escalation
      ↓
📍 GPS
      ↓
Trusted Contacts
      +
Emergency Dashboard
      ↓
Live / Periodic Location
```

---

## Scenario 4 — Emergency Voice

```text
"I am unsafe"
   ↓
10-Minute Window
   ↓
"HELP!"
   ↓
🔴 DANGER
```

Result:

```text
Immediate escalation
      ↓
📍 GPS
      ↓
Trusted Contacts
      +
Emergency Dashboard
      ↓
Live / Periodic Location
```

---

## Scenario 5 — Text Trigger

```text
User types:

"I am unsafe"
      ↓
Immediate Popup
      ↓
10-Minute Window
```

The microphone does not need to be activated for this trigger.

---

## Scenario 6 — No Response

```text
"I am unsafe"
      ↓
Immediate Popup
      ↓
No response
      ↓
No emergency voice
      ↓
10 minutes complete
```

Result:

```text
🛑 Safety Session Ends
🎙️ Microphone OFF
❌ No Alert
❌ No Location Sharing
❌ No Family Notification
❌ No Dashboard Alert
```

---

# 🔮 Future Enhancements

Possible future versions could include:

* More advanced on-device keyword models
* Multiple language support
* Wearable integration
* Smartwatch trigger
* Trusted-contact groups
* Safety route monitoring
* Geofenced safety zones
* Offline emergency fallback mechanisms
* Secure evidence capture initiated explicitly by the user
* Authorized emergency-service integration
* Institutional/campus safety integration
* Device-specific NPU acceleration

These features are outside the minimum hackathon prototype.

---

# ⚠️ Responsible Use

SafeLens is a prototype intended to demonstrate a personal safety workflow.

It should not be presented as a guaranteed replacement for:

* Emergency services
* Police response
* Medical services
* Professional security systems

Real emergency-service integration requires authorized infrastructure and appropriate legal, security, and privacy controls.

---

# 📌 Current Prototype Scope

```text
✅ Android Quick Settings SafeLens Tile
✅ SafeLens ON/OFF
✅ SafeLens is a phone-level feature, not a conventional app
✅ Microphone OFF when SafeLens is merely ON
✅ Explicit Safety Session
✅ Temporary microphone activation during Safety Session
✅ Voice trigger
✅ Text trigger
✅ "I am unsafe" detection
✅ Immediate safety popup
✅ 10-minute safety window
✅ SAFE state
✅ BAD / NEED HELP state
✅ DANGER state
✅ Emergency keyword detection
✅ GPS acquisition
✅ Trusted-contact notification
✅ Emergency Response Dashboard
✅ Periodic/live location sharing after escalation
✅ Privacy-first architecture
✅ Offline-first safety logic
✅ Microphone OFF after Safety Session
```

---

# 🏁 Final One-Line Description

> **SafeLens is a phone-level Android Quick Settings safety mode that turns “I am unsafe” — through voice or text — into an active 10-minute safety protocol with immediate check-in, emergency keyword detection, progressive escalation, GPS sharing, trusted contacts, and an emergency response dashboard.**

---

# 🎤 Hackathon Pitch

> **“SafeLens is not another SOS messaging system. It is a phone-level safety protocol. From Android Quick Settings, a user can turn on SafeLens and explicitly start a Safety Session. They can then simply say or type ‘I am unsafe.’ SafeLens immediately checks their safety and starts a 10-minute response window. During that window, the user can respond SAFE, NEED HELP, or DANGER, while predefined emergency phrases such as ‘HELP’ or ‘SAVE ME’ can trigger immediate escalation. When escalation is required, SafeLens obtains the user's location and sends the necessary emergency information to trusted contacts and our Emergency Response Dashboard. Most importantly, SafeLens does not activate the microphone just because the safety mode is ON. The microphone is used only during an explicitly started Safety Session and is turned OFF when that session ends.”**

---

# 🌟 Vision

SafeLens aims to make personal safety a **phone-level capability**, accessible directly from Quick Settings, while minimizing unnecessary location and audio data sharing.

The goal is **not to continuously track the user**.

The goal is to provide **short, privacy-aware, progressive protection when the user indicates that something may be wrong.**

```text
                 📱 PHONE
                    ↓
             🛡️ SafeLens
                    ↓
             Safety Session
                    ↓
             Voice / Text
                    ↓
          "I am unsafe"
                    ↓
            ⚠️ Check-in
                    ↓
          ⏱️ 10-Minute Window
                    ↓
       ┌────────────┴────────────┐
       ↓                         ↓
   User Response          Emergency Voice
       ↓                         ↓
       └────────────┬────────────┘
                    ↓
             Safety Decision
                    ↓
        🟢 SAFE / 🟡 HELP / 🔴 DANGER
                    ↓
             📍 Location
                    ↓
              ☁️ Backend
                    ↓
       👨‍👩‍👧 Contacts + 🚨 Dashboard
                    ↓
             🎙️ Microphone OFF
```

# 🛡️ SafeLens

### **One safety mode.**

### **One simple signal.**

### **A structured response when it matters.**

---

## 📄 License

This project is developed as a hackathon prototype.

License and open-source terms can be added based on the team's final decision.
