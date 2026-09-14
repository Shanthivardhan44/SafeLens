# 🛡️ SafeLens

SafeLens is a **phone-native, privacy-first safety mode** designed for women and solo travelers.

## 💡 Concept

SafeLens can be activated from **Android Quick Settings**, similar to Wi-Fi or Bluetooth.

When the user says:

> **"I am unsafe"**

SafeLens starts a **10-minute safety window**.

During this window it:

* Shows a **SAFE / BAD / DANGER** check-in
* Monitors predefined emergency voice phrases
* Escalates immediately if danger is detected
* Shares location only when assistance or danger is triggered
* Ends automatically after 10 minutes if nothing happens

## 🔄 Safety Flow

```text
🛡️ SafeLens ON
       ↓
"I am unsafe"
       ↓
⚠️ 10-Minute Safety Window
       ↓
┌───────────────────┬────────────────────┐
│                   │                    │
▼                   ▼                    ▼
🟢 SAFE          🟡 BAD              🔴 DANGER
│                   │                    │
▼                   ▼                    ▼
End Session     Assistance          Emergency
                   │                    │
                   └────────┬───────────┘
                            ▼
                     📍 Location
                            ↓
                       ☁️ Backend
                            ↓
                 ┌──────────┴──────────┐
                 ▼                     ▼
          👨‍👩‍👧 Trusted Contacts   🚨 Dashboard
```

---

# 🏗️ Architecture

```text
                         📱 ANDROID PHONE
                              │
                              │
                    ┌─────────▼─────────┐
                    │   Quick Settings  │
                    │   🛡️ SafeLens     │
                    └─────────┬─────────┘
                              │
                              │ ON
                              ▼
                    ┌────────────────────┐
                    │  SafeLens Service  │
                    │   Safety Manager   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │  Voice Recognition │
                    │    On-Device AI    │
                    └─────────┬──────────┘
                              │
                        "I am unsafe"
                              │
                              ▼
                    ┌────────────────────┐
                    │  Safety State      │
                    │  Machine           │
                    │                    │
                    │   ⏱️ 10 Minutes    │
                    └─────────┬──────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
       ┌─────────────────┐        ┌──────────────────┐
       │ Safety Check-in │        │ Emergency Voice  │
       │                 │        │ Detection        │
       │ 🟢 SAFE         │        │                  │
       │ 🟡 BAD          │        │ "HELP!"          │
       │ 🔴 DANGER       │        │ "SAVE ME!"       │
       └────────┬────────┘        └────────┬─────────┘
                │                          │
                └────────────┬─────────────┘
                             │
                  ┌──────────▼───────────┐
                  │   Safety Decision    │
                  │       Engine         │
                  └──────────┬───────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
        🟢 SAFE          🟡 ASSIST         🔴 DANGER
             │               │                │
             ▼               ▼                ▼
        End Session      Get Location     Get Location
                             │                │
                             └───────┬────────┘
                                     │
                                     ▼
                           📍 Location Service
                                     │
                                     ▼
                              ☁️ Backend API
                                     │
                         ┌───────────┴───────────┐
                         │                       │
                         ▼                       ▼
                  👨‍👩‍👧 Trusted Contacts    🚨 Response
                                             Dashboard
```

---

# 🔄 Safety State Flow

```text
🛡️ SAFELENS OFF
       │
       │ Quick Settings
       ▼
🛡️ SAFELENS ON
       │
       │ "I am unsafe"
       ▼
⚠️ SAFETY WINDOW STARTED
       │
       │ ⏱️ 10 Minutes
       │
       ├───────────────┬─────────────────┐
       │               │                 │
       ▼               ▼                 ▼
   🟢 SAFE          🟡 BAD           🔴 DANGER
       │               │                 │
       ▼               ▼                 ▼
  End Session     Assistance        Emergency
                      │                 │
                      ▼                 ▼
                 📍 Location       📍 Location
                      │                 │
                      └───────┬─────────┘
                              ▼
                       ☁️ Backend
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
               👨‍👩‍👧 Family       🚨 Dashboard
```

---

# 🎙️ Dual-Channel Safety Monitoring

During the 10-minute safety window, SafeLens performs **two safety checks simultaneously**.

### 1. User Safety Check-in

| Response           | Action                                   |
| ------------------ | ---------------------------------------- |
| 🟢 SAFE            | End the safety session                   |
| 🟡 BAD / NEED HELP | Start assistance and location sharing    |
| 🔴 DANGER          | Immediately trigger emergency escalation |

### 2. Emergency Voice Detection

SafeLens monitors for a small predefined set of emergency phrases.

Example:

```text
"HELP!"
"HELP HELP!"
"SAVE ME!"
"PLEASE HELP!"
```

If an emergency phrase is detected:

```text
🎙️ Emergency Voice
        ↓
🔴 DANGER
        ↓
Immediate Escalation
        ↓
📍 Get Location
        ↓
☁️ Backend API
        ↓
👨‍👩‍👧 Family + 🚨 Response Dashboard
```

---

# ⏱️ 10-Minute Safety Window

The safety session has a strict **10-minute limit**.

```text
                SAFETY WINDOW
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
     🟢 SAFE      🟡 BAD       🔴 DANGER
        │            │            │
        ▼            ▼            ▼
    End Session  Assistance    Emergency
                     │            │
                     ▼            ▼
                📍 Location   📍 Location


                 🎙️ Voice Detection
                        │
                        ▼
                 Emergency Phrase
                        │
                        ▼
                    🔴 DANGER
```

### No Response Scenario

If:

* The user does not select SAFE
* The user does not select BAD
* The user does not select DANGER
* No emergency voice phrase is detected

Then after 10 minutes:

```text
⏱️ 10 Minutes Completed
          ↓
🛑 Safety Session Ends
          ↓
❌ No Danger Alert
❌ No Location Sharing
❌ No Family Notification
❌ No Dashboard Alert
```

---

# 📍 Location & Emergency Architecture

Location is **not continuously shared by default**.

Location sharing is triggered when:

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
       │
       ▼
📍 Location Service
       │
       ▼
☁️ SafeLens Backend
       │
       ├──────────────► 👨‍👩‍👧 Trusted Contacts
       │
       └──────────────► 🚨 Emergency Dashboard
```

---

# 🧠 AI Architecture

SafeLens is designed to use **on-device voice processing** wherever possible.

```text
🎙️ Microphone
      │
      ▼
Audio Processing
      │
      ▼
Speech / Keyword Detection
      │
      ▼
Emergency Phrase Classifier
      │
      ├── Normal speech
      │       ↓
      │     Ignore
      │
      └── Emergency phrase
              ↓
          🔴 DANGER
```

The prototype will initially use a **small predefined vocabulary** of emergency phrases.

---

# 🧩 Core Components

### 📱 Android

* Quick Settings Tile
* SafeLens Service
* Safety Manager
* Safety State Machine
* Foreground Service
* Microphone handling
* Voice detection
* Location Service
* Safety notification / popup

### 🧠 AI

* Speech recognition
* Emergency keyword detection
* On-device processing
* Lightweight voice model
* Optional Snapdragon NPU acceleration

### ☁️ Backend

* Emergency event API
* User management
* Trusted contact management
* Location updates
* Emergency event storage
* Authentication
* Real-time communication

### 🚨 Emergency Dashboard

* Active emergency events
* User safety status
* Current location
* Event timestamp
* Assistance requests
* Emergency status

---

# 🛠️ Technology Stack

## Mobile

* **Kotlin**
* **Android SDK**
* Android Quick Settings API
* Foreground Services
* Android Location Services

## AI

* On-device Speech Recognition
* Lightweight ML / Keyword Detection
* Snapdragon NPU acceleration where supported

## Backend

* REST API
* Database
* Authentication
* WebSocket / Real-time Updates

## Dashboard

* React
* JavaScript
* HTML
* CSS

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
│   └── dashboard/
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

SafeLens is designed with **privacy as a core principle**.

### Normal State

```text
🛡️ SafeLens OFF
       ↓
No safety monitoring
       ↓
No location sharing
```

### Safety State

```text
🛡️ SafeLens ON
       ↓
10-minute safety window
       ↓
On-device voice processing
```

### Emergency State

```text
🔴 Emergency detected
       ↓
📍 Location requested
       ↓
☁️ Required emergency data shared
```

If the 10-minute session ends normally:

```text
Session ends
     ↓
No emergency event
     ↓
No location sharing
     ↓
No emergency notification
```

---

# ⚠️ Android Technical Constraint

Android restricts background microphone access and imposes requirements on microphone foreground services.

Therefore, SafeLens will use **Android-permitted microphone and foreground-service mechanisms** rather than assuming that a Quick Settings tile can silently maintain unrestricted microphone access.

The implementation will follow Android's current permission and background-execution requirements.

---

# 🚧 Project Status

**Prototype — Under Development**

### Current Goal

Build a working demonstration of:

```text
Quick Settings
      ↓
🛡️ SafeLens ON
      ↓
"I am unsafe"
      ↓
⏱️ 10-Minute Safety Window
      ↓
┌───────────────┬───────────────────┐
│               │                   │
▼               ▼                   ▼
🟢 SAFE      🟡 BAD             🔴 DANGER
│               │                   │
▼               ▼                   ▼
End          Assistance         Emergency
Session          │                   │
                 └─────────┬─────────┘
                           ▼
                     📍 Location
                           ↓
                      ☁️ Backend
                           ↓
                 🚨 Response Dashboard
```

---

# 🌟 Core Innovation

> **SafeLens combines a phone-native Quick Settings safety mode, explicit safety check-ins, and time-limited on-device emergency voice detection into a single privacy-first safety mechanism.**

Unlike a conventional emergency button, SafeLens provides a **dual-channel safety check**: the user can explicitly request help, while predefined emergency voice signals can trigger escalation when the user cannot interact with the phone.

---

# 🎯 Prototype Roadmap

* [ ] Android Quick Settings Tile
* [ ] SafeLens activation
* [ ] "I am unsafe" detection
* [ ] Safety popup
* [ ] 10-minute safety timer
* [ ] SAFE / BAD / DANGER states
* [ ] Emergency voice phrase detection
* [ ] Location service
* [ ] Backend emergency API
* [ ] Trusted contact notification
* [ ] Emergency response dashboard
* [ ] End-to-end prototype demonstration
