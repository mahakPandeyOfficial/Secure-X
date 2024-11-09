import { CaptureLocation } from './CaptureLocation';
import axios from 'axios';

export const triggerEmergencyAction = async () => {
  try {
    // Capture geolocation
    const location = await CaptureLocation();
    
    // TODO: Capture video and audio using Agora (done in CameraCapture component)

    // Create form data for video, audio, and location
    const formData = new FormData();
    formData.append('location', JSON.stringify(location));
    formData.append('video', { uri: 'path-to-video', name: 'video.mp4', type: 'video/mp4' });
    formData.append('audio', { uri: 'path-to-audio', name: 'audio.wav', type: 'audio/wav' });

    // Send data to the backend API
    await axios.post('http://localhost:8080/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};
