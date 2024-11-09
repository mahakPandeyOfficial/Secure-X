import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import React, { useState } from 'react';
import COLORS from './../../constants/Colors';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { db, storage } from './../../configs/FirebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const { Timestamp } = require('firebase/firestore');

let recording = null;

const ReportButton = (props) => {
    const [audioUri, setAudioUri] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    const requestPermissions = async () => {
        try {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: audioStatus } = await Audio.requestPermissionsAsync();
            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            return cameraStatus === 'granted' && audioStatus === 'granted' && locationStatus === 'granted';
        } catch (error) {
            console.error('Error requesting permissions:', error);
            return false;
        }
    };

    const startRecording = async () => {
        try {
            if (recording) await stopRecording();
            recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
                android: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.m4a',
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                },
            });
            await recording.startAsync();
            console.log('Recording started');

            // Stop recording automatically after 10 seconds
            setTimeout(async () => {
                await stopRecording();
            }, 10000);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = async () => {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setAudioUri(uri);
                recording = null;
                console.log('Recording stopped and stored at', uri);
                return uri;
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Location permission denied');
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        return { _lat: location.coords.latitude, _long: location.coords.longitude };
    };

    const reverseGeocodeLocation = async (_lat, _long) => {
        try {
            const address = await Location.reverseGeocodeAsync({ _lat, _long });
            return address;
        } catch (error) {
            console.error('Error getting address from location:', error);
            return null;
        }
    };

    const viewReports = async () => {
        try {
            const reportsRef = collection(db, 'reports');
            const reportsSnapshot = await getDocs(reportsRef);
            const reports = reportsSnapshot.docs.map((doc) => doc.data());
            console.log('Reports:', reports);
        } catch (error) {
            console.error('Error retrieving reports:', error);
        }
    };

    const submitReport = async (location, downloadURL) => {
        if (!location || !downloadURL) {
            console.error('Location or download URL is undefined. Cannot submit report.');
            return;
        }
    
        try {
            const crimesRef = collection(db, 'crimes');
            await addDoc(crimesRef, {
                createdAt: Timestamp.now(),   // Current timestamp
                description: "",              // Leave blank initially
                priority: "",                 // Leave blank initially
                status: "",                   // Leave blank initially
                tag: "",                      // Leave blank initially
                location: location || "",     // Location or blank if undefined
                audio: downloadURL || ""      // Audio file download URL or blank
            });
            console.log('Crime reported successfully.');
        } catch (error) {
            console.error('Error submitting crime report:', error);
        }
    };

    const handleReport = async () => {
        const permissionsGranted = await requestPermissions();
        if (!permissionsGranted) return;

        await startRecording();
        const location = await getLocation();
        console.log('Current location:', location);

        const address = await reverseGeocodeLocation(location.latitude, location.longitude);
        console.log('Address:', address);

        const uri = await stopRecording();
        const downloadURL = await handleUpload(uri);  // Get download URL here
        await submitReport(location, downloadURL);  // Pass download URL to submitReport
        viewReports();
    };

    const handleUpload = async (uri) => {
        if (!uri) return null;  // Return null if no URI

        const response = await fetch(uri);
        const file = await response.blob();

        const storageRef = ref(storage, `audio/${Date.now()}.m4a`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => reject('Upload failed: ' + error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setDownloadURL(downloadURL);
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);  // Resolve with the download URL
                    });
                }
            );
        });
    };

    return (
        <View>
            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: bgColor,
                    ...props.style,
                }}
                onPress={handleReport}
            >
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 25, color: textColor }}>
                    Report Incident
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 100,
        marginLeft: 50,
        paddingVertical: 10,
        paddingBottom: 16,
        width: 250,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ReportButton;
