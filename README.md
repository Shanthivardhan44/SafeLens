# 🛡️ SafeLens

### Privacy-First,Android Quick Settings Safety Feature

SafeLens is a **phone-native personal safety feature for Android Quick Settings**.

It is **not designed as a conventional emergency app**. Instead, SafeLens works as a Quick Settings control that allows a user to start a temporary safety session with minimal interaction.

During an active safety session, SafeLens can:

* 🛡️ Start from Android Quick Settings
* ⏱️ Run a temporary 10-minute safety session
* 🎙️ Detect predefined emergency phrases locally
* 🚨 Provide `SAFE / NEED HELP / DANGER` responses
* 📍 Obtain location only when escalation is required
* 🔐 Avoid storing or uploading raw audio
* 💾 Work offline for core safety functions
* ☁️ Synchronize emergency events when connectivity returns
* 👨‍👩‍👧 Notify trusted contacts when communication is available
* 🖥️ Provide an emergency-response dashboard for the prototype

> **SafeLens is an offline-first Android Quick Settings safety mode that temporarily monitors for predefined emergency phrases, provides a local safety check-in, obtains location only during escalation, and synchronizes emergency events with trusted contacts when connectivity is available.**

---

## 💡 Why SafeLens?

In an unsafe situation, manually sending a message can require several actions:

```text
Unsafe situation
      ↓
Unlock phone
      ↓
Open messaging application
      ↓
Find family member
      ↓
Type message
      ↓
Attach/share location
      ↓
Send
```

SafeLens reduces these interactions by preparing the safety workflow in advance.

```text
Unsafe situation
      ↓
Quick Settings
      ↓
🛡️ SafeLens
      ↓
Safety Session
      ↓
"HELP" / "DANGER"
      ↓
Automatic location
      ↓
Emergency event
      ↓
Trusted contacts / Dashboard
```

The main advantage is **not simply speed**.

The purpose is to reduce the number of decisions and phone interactions required when the user is stressed or unable to operate the phone normally.

SafeLens can also automate structured emergency information, location acquisition, and follow-up updates.

---

# 🎯 Target Users

SafeLens is designed for situations where a person may be:

* 👩 Traveling alone
* 🎓 A student returning home
* 🚶 Walking alone
* 🚌 Commuting
* 🧳 Traveling
* 🌙 Moving through an unfamiliar area

The system is intended to provide an additional safety mechanism rather than replace emergency services.

---

# 📱 How SafeLens Works

The user adds SafeLens to Android Quick Settings:

```text
┌─────────────┐
│ Wi-Fi       │
│ Bluetooth   │
│ Location    │
│ 🛡️ SafeLens │
└─────────────┘
```

When the user taps SafeLens, a temporary safety session begins.

### Basic flow

```text
SafeLens OFF
      ↓
User taps SafeLens
      ↓
Safety Session Starts
      ↓
Safety Check-in
      ↓
10-Minute Safety Window
      ↓
┌───────────────┬──────────────────┐
│               │                  │
▼               ▼                  ▼
SAFE        NEED HELP           DANGER
│               │                  │
▼               ▼                  ▼
End         Location          Immediate
Session     + Assistance      Escalation
                │                  │
                └────────┬─────────┘
                         ↓
                  Emergency Event
                         ↓
                 Backend / Contacts
```

During the active session, predefined emergency phrases can also be detected locally.

---

# 🎙️ Emergency Voice Detection

SafeLens uses **temporary, on-device phrase detection** rather than continuous cloud-based audio processing.

Example phrases:

```text
"HELP"
"HELP HELP"
"SAVE ME"
"PLEASE HELP"
```

Example:

```text
Microphone
    ↓
Local Audio Processing
    ↓
Keyword / Phrase Detection
    ↓
"HELP" detected
    ↓
VOICE_DANGER
    ↓
Location
    ↓
Emergency Event
```

The prototype focuses on a **small predefined vocabulary** rather than attempting to detect every possible form of distress.

Raw audio should not be uploaded to the backend during the normal emergency workflow.

---

# 🚦 Safety States

SafeLens uses a state-based safety model.

```text
DISABLED
    ↓
ARMED
    ↓
STARTING_SESSION
    ↓
CHECK_IN_ACTIVE
    ↓
MONITORING
    ├── SAFE
    ├── NEED_HELP
    ├── DANGER
    ├── VOICE_DANGER
    ├── CANCELLED
    └── TIMEOUT
```

## 🟢 SAFE

```text
User selects SAFE
      ↓
Close session
      ↓
Stop microphone
      ↓
No location sharing
      ↓
No emergency notification
```

## 🟡 NEED HELP

Used when the situation is concerning but the user does not consider it an immediate emergency.

```text
NEED HELP
    ↓
Get location
    ↓
Create assistance event
    ↓
Notify trusted contacts
    ↓
Optional location updates
```

## 🔴 DANGER

Used for an immediate emergency.

```text
DANGER
   OR
Emergency phrase detected
      ↓
Immediate escalation
      ↓
Get location
      ↓
Create emergency event
      ↓
Notify trusted contacts
      ↓
Emergency dashboard
      ↓
Periodic location updates
```

## ⏱️ TIMEOUT

If the 10-minute session ends without a safety response or emergency phrase:

```text
10 Minutes Completed
       ↓
Session Ends
       ↓
Microphone Stops
       ↓
No Location Sharing
       ↓
No Emergency Notification
```

This behavior is intentional in the current prototype design.

---

# 👤 Real-World Example

### Scenario: Student Walking Home

Imagine a student walking home alone at night.

### Step 1 — Activate SafeLens

The student opens Quick Settings and taps:

```text
🛡️ SafeLens
```

A safety session starts.

---

### Step 2 — Safety Check-In

SafeLens displays:

```text
⚠️ SafeLens

You said you are unsafe.

Are you okay?

🟢 SAFE

🟡 NEED HELP

🔴 DANGER
```

A 10-minute safety window starts.

---

### Step 3 — Two Channels Work Together

During those 10 minutes:

```text
                Safety Session
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
     User Check-in          Voice Detection
          │                       │
    SAFE / HELP /           HELP / SAVE ME
       DANGER                     │
          │                       │
          └───────────┬───────────┘
                      ↓
               Decision Engine
```

---

### Step 4 — Emergency

Suppose the student cannot touch the phone and says:

> "HELP!"

SafeLens detects the predefined emergency phrase.

```text
"HELP!"
   ↓
VOICE_DANGER
   ↓
Get GPS Location
   ↓
Create Emergency Event
   ↓
Send Required Information
   ↓
Trusted Contact
   +
Emergency Dashboard
```

---

### Step 5 — Example Alert

The trusted contact could receive structured information such as:

```text
🛡️ SafeLens Emergency Alert

Event: DANGER
Time: 7:42 PM

Location: [Map Location]

Accuracy: 18 meters
Battery: 42%

Status: ACTIVE
```

Structured information can be more useful than simply sending:

```text
"HELP"
```

The prototype design also supports periodic location updates after escalation.

---

# 🌐 Offline-First Design

One of the important features of SafeLens is that **core safety functionality does not depend on the internet**.

## What works offline?

| Feature                             | Offline   |
| ----------------------------------- | --------- |
| Quick Settings tile                 | ✅         |
| Safety session                      | ✅         |
| 10-minute timer                     | ✅         |
| Safety popup                        | ✅         |
| SAFE / NEED HELP / DANGER           | ✅         |
| On-device phrase detection          | ✅         |
| Local emergency decision            | ✅         |
| GPS location acquisition            | ✅ Usually |
| Local event storage                 | ✅         |
| Local notification/alarm            | ✅         |
| Cloud backend                       | ❌         |
| Remote dashboard                    | ❌         |
| Internet-based contact notification | ❌         |
| Live cloud location sharing         | ❌         |

GPS can generally obtain a location without internet, although it may take longer depending on environmental conditions.

---

# 🔄 Offline-First Architecture

When there is no internet:

```text
Emergency Detected
       ↓
Get GPS Location
       ↓
Encrypt & Save Event Locally
       ↓
Internet Available?
       │
   ┌───┴────┐
   │        │
  YES       NO
   │        │
   ▼        ▼
Upload    Keep in
Event     Retry Queue
   │        │
   ▼        │
Notify     │
Contacts   │
   │        │
   ▼        │
Dashboard  │
            │
      Connection Returns
            ↓
       Upload Event
```

This means the emergency event is not immediately lost just because the phone temporarily has no internet.

The recommended design is to save an encrypted event locally and synchronize it when connectivity returns.

---

# 📡 Optional SMS Fallback

An optional future feature can use SMS when:

```text
Internet unavailable
        ↓
Cellular network available
        ↓
Send emergency SMS
        ↓
Trusted Contact
```

Example:

```text
SafeLens Emergency Alert

Possible danger detected.

Location:
[Map Link]

Time:
18:42
```

However, SMS is considered an **optional fallback**, not the primary architecture because it requires cellular service and has Android permission/policy and delivery limitations.

---

# 🏗️ System Architecture

The recommended architecture separates the Quick Settings tile from the actual safety logic.

```text
                 📱 ANDROID PHONE
                        │
                        ▼
              ┌───────────────────┐
              │  Quick Settings   │
              │   🛡️ SafeLens     │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │ SafeLensTileService│
              └─────────┬─────────┘
                        │
                        ▼
          ┌────────────────────────────┐
          │ SafetySessionCoordinator   │
          │                            │
          │ • State Machine            │
          │ • Timer                    │
          │ • Permission Checks        │
          │ • Recovery                 │
          │ • Event Management         │
          └─────────────┬──────────────┘
                        │
            ┌───────────┼──────────────┐
            │           │              │
            ▼           ▼              ▼
      🎙️ Microphone  ⚠️ Check-in   ⏱️ Timer
       FGS            UI            Manager
            │           │
            ▼           │
    On-device Phrase   │
       Detector        │
            │           │
            └─────┬─────┘
                  ▼
        ┌─────────────────────┐
        │ Safety Decision     │
        │ Engine              │
        └─────────┬───────────┘
                  │
        ┌─────────┼───────────┐
        ▼         ▼           ▼
      SAFE      HELP        DANGER
        │         │           │
        ▼         └─────┬─────┘
     End Session         ▼
                   📍 Location
                        │
                        ▼
              Escalation Coordinator
                        │
                        ▼
                ☁️ Backend API
                   │          │
                   ▼          ▼
             Trusted      Emergency
             Contacts     Dashboard
```

The Quick Settings tile is therefore the **control point**, while the session controller and services perform the actual workflow.

---

# 🧩 Main Components

### Android

* `SafeLensTileService`
* `SafetySessionCoordinator`
* `SafetyState`
* `SafetyDecisionEngine`
* `MicrophoneForegroundService`
* `LocationForegroundService`
* `CheckInActivity`
* `SetupActivity`
* Notification Manager
* Local Storage

### Voice / AI

* On-device speech/keyword detection
* Predefined emergency vocabulary
* Lightweight keyword model
* Local processing

### Backend

* REST API
* Authentication
* Database
* Emergency event management
* Trusted contacts
* Location updates
* Real-time communication

### Dashboard

* React
* JavaScript
* HTML
* CSS
* Map integration

These components and technologies are part of the proposed architecture in the project specification.

---

# 🔐 Privacy Model

Privacy is a core design principle.

## SafeLens OFF

```text
SafeLens OFF
    ↓
No microphone
No monitoring
No location sharing
```

## SafeLens ON / ARMED

```text
SafeLens ON
    ↓
Ready for safety activation
    ↓
No continuous microphone monitoring
    ↓
No continuous location sharing
```

## Active Safety Session

```text
Safety Session
      ↓
Temporary microphone processing
      ↓
On-device phrase detection
      ↓
No raw audio upload
```

## Emergency

```text
Emergency Detected
      ↓
Request Location
      ↓
Send Required Emergency Metadata
```

SafeLens should not continuously transmit location simply because the Quick Settings feature is enabled.

---

# 🛡️ Security Principles

SafeLens follows a data-minimization approach.

### Microphone

* Request `RECORD_AUDIO`
* Use microphone only during an active safety session
* Use an appropriate foreground service
* Do not store raw audio
* Do not upload raw audio
* Clearly indicate microphone usage

### Location

Location is requested only when escalation is triggered.

```text
SAFE
  → No location

TIMEOUT
  → No location

NEED HELP
  → Location

DANGER
  → Location

VOICE_DANGER
  → Location
```

### Backend

The backend should use:

* HTTPS/TLS
* Authentication
* Authorization
* Encryption at rest
* Rate limiting
* Audit logs
* Event idempotency
* Data retention/deletion policies
* Strict dashboard access control

---

# ⚠️ Android Constraints

SafeLens is designed around Android's security restrictions.

A Quick Settings `TileService` should **not be treated as a continuously running safety engine**.

Instead:

```text
Quick Settings Tile
        ↓
User Action
        ↓
Safety Session Controller
        ↓
Temporary Foreground Service
```

Microphone access also requires appropriate permissions and foreground-service configuration. Modern Android versions restrict background microphone-related behavior, so the implementation must follow Android's permitted service and permission model.

The prototype should be tested on the target device, including:

* Quick Settings behavior
* Screen lock
* Microphone permissions
* Foreground service
* Location
* Notifications
* Battery optimization
* Network interruptions
* OEM restrictions

---

# 📁 Project Structure

```text
SafeLens/
│
├── android/
│   └── app/
│       └── src/main/
│           ├── kotlin/
│           │   └── safelens/
│           │       ├── tile/
│           │       │   └── SafeLensTileService.kt
│           │       │
│           │       ├── session/
│           │       │   ├── SafetySessionCoordinator.kt
│           │       │   ├── SafetyState.kt
│           │       │   └── SafetyDecisionEngine.kt
│           │       │
│           │       ├── service/
│           │       │   ├── MicrophoneForegroundService.kt
│           │       │   └── LocationForegroundService.kt
│           │       │
│           │       ├── voice/
│           │       │   ├── PhraseDetector.kt
│           │       │   └── AudioPrivacyPolicy.kt
│           │       │
│           │       ├── ui/
│           │       │   ├── CheckInActivity.kt
│           │       │   └── SetupActivity.kt
│           │       │
│           │       ├── location/
│           │       ├── notification/
│           │       ├── storage/
│           │       └── networking/
│           │
│           └── AndroidManifest.xml
│
├── ai/
│   ├── models/
│   └── voice_detection/
│
├── backend/
│   ├── api/
│   ├── auth/
│   ├── events/
│   ├── contacts/
│   ├── locations/
│   └── database/
│
├── dashboard/
│   └── emergency-response-dashboard/
│
├── docs/
│   ├── privacy-model.md
│   ├── android-limitations.md
│   ├── state-machine.md
│   └── threat-model.md
│
├── prototype/
│   └── demo-assets/
│
├── README.md
├── .gitignore
└── LICENSE
```

The setup UI exists mainly for permissions, trusted contacts, privacy explanations, account configuration, and settings; it is not intended to become the primary product experience.

---

# 🚀 Development Roadmap

## Phase 1 — Local Prototype

```text
Quick Settings Tile
        ↓
Start Safety Session
        ↓
Safety Check-in
        ↓
10-Minute Timer
        ↓
SAFE / NEED HELP / DANGER
        ↓
Local Notification
```

No backend or voice detection initially.

---

## Phase 2 — Offline Voice Detection

```text
Active Session
      ↓
Microphone Foreground Service
      ↓
On-device "HELP" Detection
      ↓
Local DANGER Event
```

Test:

* Battery consumption
* Background behavior
* Screen lock
* Noise
* Process termination

---

## Phase 3 — Location

```text
DANGER / NEED HELP
       ↓
Get GPS Location
       ↓
Save Emergency Event Locally
```

---

## Phase 4 — Connectivity

```text
Emergency Event
       ↓
Authenticated API
       ↓
Trusted Contact Notification
       ↓
Emergency Dashboard
```

---

## Phase 5 — Reliability Testing

Test the system under:

* 🔒 Locked screen
* 🔄 Phone reboot
* 📡 No network
* 📍 No GPS
* 🔋 Battery saver
* 🌙 Do Not Disturb
* 🎙️ Microphone permission revoked
* 📍 Location permission revoked
* ❌ Process killed
* 📱 Different Android versions
* 📱 Target iQOO device
* 🔊 False voice triggers
* 🔄 Multiple sessions

The project specification recommends building the device-only flow before adding voice detection, backend, and live tracking.

---

# 🧪 MVP

The first working demonstration should focus on:

```text
🛡️ Quick Settings
       ↓
SafeLens
       ↓
Safety Session
       ↓
Check-in
       ↓
10-Minute Timer
       ↓
SAFE / NEED HELP / DANGER
       ↓
Local Emergency Event
```

Then gradually add:

```text
Voice Detection
       ↓
Location
       ↓
Offline Storage
       ↓
Backend
       ↓
Trusted Contacts
       ↓
Dashboard
```

---

# 🌟 Core Innovation

SafeLens combines three ideas:

### 1. 📱 Phone-Native Safety

The feature is accessible directly from Android Quick Settings rather than requiring the user to navigate through a conventional app interface.

### 2. 🎙️ Dual-Channel Safety

```text
                 SafeLens
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   User Check-in        Emergency Voice
SAFE / HELP / DANGER    HELP / SAVE ME
          │                   │
          └─────────┬─────────┘
                    ↓
             Safety Decision
                    ↓
              Progressive Help
```

This allows the user to explicitly request help or trigger escalation through predefined emergency phrases during an active session.

### 3. 🌐 Offline-First Safety

Core detection and local safety processing can continue without internet.

```text
Offline Emergency
       ↓
Local Detection
       ↓
GPS
       ↓
Encrypted Local Storage
       ↓
Connection Returns
       ↓
Backend Synchronization
```

---

# 🆚 SafeLens vs Manual Messaging

| Manual Messaging                    | SafeLens                             |
| ----------------------------------- | ------------------------------------ |
| Unlock phone                        | Quick Settings access                |
| Open messaging app                  | Preconfigured workflow               |
| Select contact                      | Trusted contacts predefined          |
| Type message                        | Structured emergency event           |
| Manually share location             | Automatic location acquisition       |
| User may need to send updates       | Periodic updates can be automated    |
| Requires more interaction           | Designed for minimal interaction     |
| No built-in safety session          | 10-minute safety session             |
| No central event status             | Emergency dashboard                  |
| Usually requires screen interaction | Voice trigger can reduce interaction |

However, SafeLens should **not claim that it is always faster** than manually messaging someone. If the user can safely unlock the phone and send a message, manual messaging may be simpler.

The main value is reducing interaction and automating the safety workflow.

---

# ⚠️ Limitations

SafeLens is a prototype and has important limitations.

### Voice Detection

Predefined phrase detection can have:

* False positives
* False negatives
* Difficulty with accents
* Difficulty in noisy environments
* Difficulty with different languages
* Difficulty when speech is muffled

Therefore, the prototype should describe this as **predefined emergency phrase detection**, not guaranteed AI emergency detection.

### Android Restrictions

Behavior can vary because of:

* Android background restrictions
* Foreground-service rules
* Battery optimization
* OEM restrictions
* Lock-screen behavior
* Permission changes

### Connectivity

Without internet or cellular communication, SafeLens cannot reliably:

* Notify remote contacts
* Update the dashboard
* Send live location remotely
* Contact emergency authorities
* Confirm remote alert delivery

It can still detect an emergency locally, obtain location, show a local notification, and save the event on the device.

### Emergency Services

The dashboard is a **prototype response system**.

It should not be presented as direct police or government emergency-service integration unless an authorized integration actually exists.

---

# 🔮 Future Improvements

Possible future improvements include:

* 🌍 Multi-language emergency phrase detection
* 🧠 Lightweight on-device acoustic models
* 📳 Better haptic feedback
* 🔋 Battery-efficient voice detection
* 🗺️ Offline maps
* 📡 SMS fallback
* 🔄 Reliable event synchronization
* 📍 Improved location tracking
* 🔐 Stronger security controls
* 👨‍👩‍👧 Trusted-contact management
* 🖥️ Advanced response dashboard
* 📱 Testing across multiple OEM devices
* 🤖 Device-specific AI/NPU optimization

---

# 📊 Final Architecture

```text
                         🛡️ SafeLens
                              │
                              ▼
                    Android Quick Settings
                              │
                              ▼
                       TileService
                              │
                              ▼
                 SafetySessionCoordinator
                              │
             ┌────────────────┼─────────────────┐
             │                │                 │
             ▼                ▼                 ▼
       Voice Service      Check-in UI       Timer
             │                │                 │
             ▼                │                 │
      On-device Phrase        │                 │
         Detection            │                 │
             │                │                 │
             └────────────────┼─────────────────┘
                              ▼
                    Safety Decision Engine
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
           SAFE          NEED HELP          DANGER
             │                │                │
             ▼                └──────┬─────────┘
        End Session                 ▼
                              Location Service
                                     │
                                     ▼
                           Encrypted Event Store
                                     │
                           ┌─────────┴─────────┐
                           │                   │
                     Internet ON          Internet OFF
                           │                   │
                           ▼                   ▼
                      Backend API        Local Retry Queue
                           │
                    ┌──────┴───────┐
                    ▼              ▼
              Trusted Contacts   Dashboard
```

---

# 🎯 Project Goal

The goal of SafeLens is **not continuous tracking**.

The goal is to provide a short, privacy-aware safety workflow that becomes active when the user needs it.

```text
Minimal Interaction
        +
Local Processing
        +
Temporary Monitoring
        +
Automatic Escalation
        +
Offline Capability
        +
Privacy
```

---

# 🚧 Project Status

**Prototype — Under Development**

Current target:

```text
Quick Settings
      ↓
🛡️ SafeLens
      ↓
Safety Session
      ↓
10-Minute Window
      ↓
SAFE / NEED HELP / DANGER
      ↓
Voice Detection
      ↓
Location
      ↓
Emergency Event
      ↓
Trusted Contacts / Dashboard
```

---





---

# 🏁 Demo Flow

The final prototype demonstration will show:

```text
1. User opens Quick Settings
             ↓
2. Taps 🛡️ SafeLens
             ↓
3. Safety session starts
             ↓
4. Safety check-in appears
             ↓
5. 10-minute timer begins
             ↓
6. Voice detection runs locally
             +
   User can select SAFE / HELP / DANGER
             ↓
7. "HELP!" detected
       OR
   User selects DANGER
             ↓
8. Emergency escalation
             ↓
9. GPS location obtained
             ↓
10. Emergency event created
             ↓
11. Trusted contact notified
             ↓
12. Dashboard displays event
```

---

# 📝 Important Note

SafeLens is a **prototype safety mechanism**, not a guaranteed emergency-response system.

Its reliability depends on Android permissions, device behavior, microphone availability, GPS availability, battery restrictions, network/cellular connectivity, and the accuracy of voice detection.

The project is designed to demonstrate a **privacy-first, offline-first Quick Settings safety workflow** rather than replace professional emergency services.

---

## ⭐ SafeLens

> **Tap once. Stay prepared. Escalate only when needed.**

**Privacy-first • Offline-first • Phone-native • Minimal interaction**
