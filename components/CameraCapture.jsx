import React, { useEffect, useState } from 'react';
import { RtcEngine } from 'agora-rtc-sdk-ng';
import { CaptureLocation } from './CaptureLocation';  // Import location service
import axios from 'axios';

const APP_ID = 'a38cd097879c4dcd9b539cd68600e3b4';  // Replace with your Agora App ID

export const triggerEmergencyAction = async () => {
  try {
    // Initialize Agora SDK for video/audio capture
    const engine = await RtcEngine.create(APP_ID);
    await engine.join(null, 'channel-name', null, null);  // Replace with appropriate channel

    // Start video/audio capture
    engine.startPreview();

    // Capture for 10 seconds and then stop
    setTimeout(async () => {
      await engine.leaveChannel();
      engine.stopPreview();

      // Capture geolocation
      const location = await CaptureLocation();

      // Send captured data to backend
      const formData = new FormData();
      formData.append('location', JSON.stringify(location));
      formData.append('video', { uri: 'path-to-video', name: 'video.mp4', type: 'video/mp4' });

      await axios.post('http://localhost.8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Emergency data uploaded successfully!');
    }, 10000);  // Capture for 10 seconds
  } catch (error) {
    console.error('Error capturing or uploading emergency data:', error);
  }
};
