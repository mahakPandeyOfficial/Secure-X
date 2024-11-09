import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const EditProfile = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Clerk's user hook

  const [name, setName] = useState(user ? user.firstName : '');
  const [email, setEmail] = useState(user ? user.emailAddresses[0].emailAddress : '');

  const handleSave = async () => {
    // Logic to update the user profile using Clerk's API
    try {
      if (!isLoaded || !isSignedIn) return;

      await user.update({
        firstName: name,
        emailAddress: email,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
      alert('Failed to update profile.');
    }
  };

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Save Profile" onPress={handleSave} />
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

export default EditProfile;
