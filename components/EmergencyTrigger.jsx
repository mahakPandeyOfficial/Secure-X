import { useEffect } from 'react';
import { Alert } from 'react-native';
import KeyEvent from 'react-native-keyevent';
import { triggerEmergencyAction } from './uploadService';  // Custom service for handling emergency

const EmergencyTrigger = () => {
  useEffect(() => {
    // Add event listener for hardware buttons
    KeyEvent.onKeyDownListener((keyEvent) => {
      if (keyEvent.keyCode === 24 && keyEvent.keyCode === 25) {  // Volume Up & Volume Down
        handleEmergency();  // Trigger emergency
      }
    });

    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, []);

  const handleEmergency = async () => {
    // Notify the user
    Alert.alert('Emergency Detected', 'Starting camera, audio, and location capture...');
    
    // Trigger the capture of video, audio, and geolocation
    await triggerEmergencyAction();
  };

  return null;
};

export default EmergencyTrigger;
