import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import Colors from './../../constants/Colors';
import LegalAgreement from '../LegalAgreement';
import AboutSecureX from '../AboutSecureX';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation

export default function EditableProfile() {
  const { user, isLoaded } = useUser();
  const { updateUser } = useClerk();
  const navigation = useNavigation(); // To handle navigation between screens
  
  // Local state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false); // Track if image was changed

  useEffect(() => {
    if (isLoaded && user) {
      // Initialize form fields with user information
      setName(user.fullName || '');
      setEmail(user.emailAddresses[0]?.email || '');
      setPhone(user.phoneNumbers[0]?.phone || '');
      setProfileImage(user.imageUrl || null); // Assuming Clerk user object has imageUrl
    }
  }, [isLoaded, user]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    
    try {
      // Split first and last name
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ').slice(1).join(' ');
  
      // Update user profile
      await updateUser({
        firstName,
        lastName,
        emailAddresses: [{ emailAddress: email }],  // Ensures email format is correct
        phoneNumbers: [{ phoneNumber: phone }],     // Ensures phone format is correct
      });
  
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

 const handleImageUpload = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    name: 'profile.jpg',
    type: 'image/jpeg'
  });

  try {
    const response = await fetch('YOUR_CLOUD_UPLOAD_ENDPOINT', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const result = await response.json();
    return result.imageUrl;  // Return the URL from your cloud service
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const uploadedImageUrl = await handleImageUpload(result.uri);
    if (uploadedImageUrl) {
      setProfileImage(uploadedImageUrl);  // Update local state with uploaded image URL
      await updateUser({ imageUrl: uploadedImageUrl });  // Clerk update
      alert('Image updated successfully!');
    }
  }
};

  const uploadProfileImage = async (uri) => {
    // Logic for uploading image to a server or cloud storage
    // This function should return the URL of the uploaded image
    // Placeholder logic:
    return new Promise((resolve) => setTimeout(() => resolve(uri), 1000)); // Replace with actual upload logic
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Select Profile Image</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button color='#FD8B51' title="Update Profile" onPress={handleUpdateProfile} />

      {/* Add buttons for Legal Agreement and About SecureX */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LegalAgreement')} // Assuming you've defined this route
      >
        <Text style={styles.navButtonText}>Legal Agreement</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('AboutSecureX')} // Assuming you've defined this route
      >
        <Text style={styles.navButtonText}>About SecureX</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primary,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2E5BF',
    marginBottom: 20,
    marginTop: 25,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#FD8B51',
    backgroundColor: '#F2E5BF',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  placeholderText: {
    color: '#fff',
    textAlign: 'center',
  },
  navButton: {
    backgroundColor: '#FD8B51',
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
