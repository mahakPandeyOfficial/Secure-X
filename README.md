# Secure-X

**Secure-X** is a real-time crime and accident reporting system designed to enhance public safety by leveraging AI, mobile technology, and cloud services. This project includes a mobile app, a police dashboard, and a backend server to facilitate real-time incident reporting, classification, and prioritization based on severity, assisting law enforcement with timely responses.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [System Architecture](#system-architecture)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)
9. [License](#license)

---

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### Screen Shots of Mobile Application:
## 1. Loading Screen------->

![WhatsApp Image 2024-11-03 at 22 38 24_80da2b9e](https://github.com/user-attachments/assets/93efa0e3-3090-4233-b06e-d159f8dfdbc0)

## 2. Landing Screen & Login Screen ------->

![WhatsApp Image 2024-11-03 at 22 38 24_709f59d3](https://github.com/user-attachments/assets/940d9ea9-767e-4f21-b9de-08699e855bde)

## 3. Home Screen ------------>

![WhatsApp Image 2024-11-03 at 22 38 24_1d1aafbe](https://github.com/user-attachments/assets/0f1c73e9-a514-4c31-8765-9abc086da20a)

## 4. Camera Permission for Profile Edit Screen-------------->

![WhatsApp Image 2024-11-03 at 22 38 24_90d2ffe6](https://github.com/user-attachments/assets/fc3107a5-5a4a-4e24-8a56-1c78a94a8a64)

## 5. Emergency Contact Screen ----------->

![WhatsApp Image 2024-11-03 at 22 38 24_a1d3f7f7](https://github.com/user-attachments/assets/6f126737-e168-4803-bb9f-06d891a16d3e)

## 6. Permissions for Camera Recording ---------->

![WhatsApp Image 2024-11-03 at 22 38 24_1255e6db](https://github.com/user-attachments/assets/eca411ca-bc65-40ec-b1f5-31404043629a)

## 7. Audio Permissions for Recording  and reporting ----------->

![WhatsApp Image 2024-11-03 at 22 38 24_72a0e038](https://github.com/user-attachments/assets/b72b701e-c769-4292-ab27-fc958970e9ca)

## 8. Location Permission ------------->

![WhatsApp Image 2024-11-03 at 22 38 24_00fd0fab](https://github.com/user-attachments/assets/433abcac-5d13-4967-bbd1-56ba865e3975)

## 9. Settings Screen ------------->

![WhatsApp Image 2024-11-03 at 22 38 24_f29861ef](https://github.com/user-attachments/assets/1786d2c1-b2b6-4c53-b086-b45de237e939)

## Terms & Conditions with Privacy Policy---------->

![WhatsApp Image 2024-11-03 at 22 38 24_e10fca73](https://github.com/user-attachments/assets/1f358f66-e528-4beb-a85c-7b525d64ab07)


### Now Let know more about Secure-X App Which will help you from crimes & also help in reporting it.

## 1. Overview

Secure-X enables users to report crimes and accidents in real time. The mobile app allows users to capture video, audio, and location data, which is sent to a centralized backend for processing. Using AI models, incidents are classified and prioritized based on type and severity. A police dashboard provides law enforcement officials with real-time notifications and access to reported incidents, ensuring timely and appropriate responses.

---

## 2. Features

- **Real-Time Reporting**: Users can report incidents with live video, audio, and location data.
- **AI-Driven Classification**: Incidents are classified (e.g., fighting, accident, theft) using AI models.
- **Severity-Based Prioritization**: Incidents are prioritized based on their severity level.
- **Police Dashboard**: A web interface for law enforcement to view and respond to incidents in real-time.
- **Cross-Platform Mobile App**: Developed with React Native for Android and iOS compatibility.
- **Secure Cloud Storage**: Audio and video data is stored on cloud platforms (AWS S3 or Google Cloud).
- **Real-Time Notifications**: Incident notifications are sent to police stations through Firebase.

---

## 3. Tech Stack

### Frontend (Mobile App)
- **Framework**: React Native
- **Languages**: JavaScript, TypeScript
- **Dependencies**:
  - `react-native-camera` for video/audio capture
  - `react-native-geolocation` for real-time location tracking
  - `react-native-webrtc` for live video streaming
- **APIs**:
  - Google Maps API for geolocation
  - Firebase for real-time communication
  - Hugging Face for AI model integration

### Backend (Server-Side)
- **Language**: Node.js
- **Machine Learning**:
  - Hugging Face models for incident classification
  - YOLO for object detection
- **Storage**:
  - AWS S3 or Google Cloud for media storage
  - MongoDB or PostgreSQL for metadata storage

### Police Dashboard (Web Interface)
- **Frontend**: React.js
- **Backend**: Node.js with RESTful APIs
- **Real-Time Communication**: Firebase or WebSocket

### Cloud Services
- **Hosting**: AWS or Google Cloud for backend, Firebase for real-time notifications
- **AI Model Hosting**: Hugging Face, AWS SageMaker, or Google AI Platform

---

## 4. Installation

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **MongoDB** or **PostgreSQL** for backend database.
- **AWS** or **Google Cloud** account for cloud storage and hosting.
- **Firebase** account for real-time communication.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mahakPandeyOfficial/Secure-X.git
   cd Secure-X
   ```
2.  Install Backend Dependencies:

``` bash
Copy code
cd backend
npm install
```

3. Install Mobile App Dependencies:

```bash
Copy code
cd ../mobile-app
npm install
```

4. Install Dashboard Dependencies:

```bash
Copy code
cd ../dashboard
npm install
```
5. Environment Variables: Create .env files in each directory (backend, mobile-app, dashboard) and add your configuration details, such as API keys and database credentials.

6. Run the Application:

 * Backend:
```bash
Copy code
cd backend
npm start
```
 * Mobile App:

```bash
Copy code
cd ../mobile-app
npm run start
```

 * Dashboard:

```bash
Copy code
cd ../dashboard
npm start
```

## 5. Usage

-Register: Users can sign up in the mobile app to report incidents.
-Report Incident: Capture video or audio, add a description, and submit the report. The app sends data to the backend.
-Incident Classification: The backend AI classifies the incident type (e.g., accident, fighting).
-View on Dashboard: Police officers can view incidents in real-time on the dashboard with location tracking and severity indicators.
-Receive Notifications: Real-time alerts are sent to nearby law enforcement stations based on incident type and severity.

## 6. System Architecture
The system follows a modular architecture with the following components:

-Mobile App (React Native): Captures incidents and sends data to the backend.
-Firebase Connectivity with App.
-Backend Server (Node.js): Manages API requests, AI model integration, and data processing.
-AI/ML Models (Hugging Face, YOLO): Classify and prioritize incidents.
-Cloud Storage (AWS/Google Cloud): Store media securely.
-Police Dashboard (React.js): Real-time interface for monitoring incidents and locations.


## 7. API Documentation

--Sample API Endpoints
POST /api/report - Submit a new incident report.
GET /api/incidents - Retrieve list of incidents.
POST /api/notifications - Send notifications to police stations.
GET /api/incident/
- Retrieve specific incident details.
Detailed API documentation will be added soon.

## 8. Contributing
We welcome contributions to enhance Secure-X! Follow these steps:

## Fork the repository.

1. Create a new branch for your feature:

```bash
Copy code
git checkout -b feature-name
```
2. Commit changes:
```bash
Copy code
git commit -m "Add feature description"
```
3. Push to the branch:

```bash
Copy code
git push origin feature-name
```

4. Open a Pull Request.
   
Please make sure your code follows the coding standards and includes proper documentation.


