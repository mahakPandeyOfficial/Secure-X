import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, NativeEventEmitter, NativeModules } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import * as Location from 'expo-location';
import { mediaDevices } from 'react-native-webrtc';

const Security = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request location permissions
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    // Add event listener for volume button presses
    const volumeEmitter = new NativeEventEmitter(NativeModules.VolumeButtonModule);
    volumeEmitter.addListener('volumeUp', handleEmergencyTrigger);
    volumeEmitter.addListener('volumeDown', handleEmergencyTrigger);

    return () => {
      volumeEmitter.removeAllListeners('volumeUp');
      volumeEmitter.removeAllListeners('volumeDown');
    };
  }, []);

  const handleEmergencyTrigger = async () => {
    Alert.alert("Emergency Trigger Activated!");

    // Capture media (video and audio)
    const stream = await mediaDevices.getUserMedia({ video: true, audio: true });

    // Handle location and media sending logic
    if (location) {
      const emergencyData = {
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        videoStream: stream.getVideoTracks(),
        audioStream: stream.getAudioTracks(),
      };

      // Send data to your backend
      sendEmergencyData(emergencyData);
    }
  };

  const sendEmergencyData = async ({ location, videoStream, audioStream }) => {
    try {
      const formData = new FormData();
      formData.append('location', JSON.stringify(location));

      // Mock video/audio files for testing (use actual media tracks in a real scenario)
      const videoFile = new Blob([videoStream[0]], { type: 'video/mp4' });
      const audioFile = new Blob([audioStream[0]], { type: 'audio/mpeg' });

      formData.append('video', videoFile, 'emergency-video.mp4');
      formData.append('audio', audioFile, 'emergency-audio.mp3');

      const response = await fetch('http://localhost:8080/report', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Emergency data sent successfully!');
      } else {
        console.error('Failed to send emergency data');
      }
    } catch (error) {
      console.error('Error sending emergency data:', error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (!isLoaded || !isSignedIn) return;
      await user.updatePassword({
        oldPassword,
        newPassword,
      });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error changing password: ', error);
      alert('Failed to update password.');
    }
  };

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Old Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter old password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Change Password" onPress={handlePasswordChange} />

      <Text style={styles.label}>Emergency Trigger Active. Press Volume Buttons to Trigger!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default Security;
