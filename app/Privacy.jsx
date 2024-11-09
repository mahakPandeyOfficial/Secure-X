import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const Privacy = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const handleManagePrivacy = async () => {
    try {
      // Update privacy settings in public metadata
      await user.update({
        publicMetadata: {
          privacyMode: true, // Example flag for privacy
        },
      });
      alert('Privacy settings updated!');
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      alert('Failed to update privacy settings.');
    }
  };

  if (!isLoaded || !isSignedIn) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Manage your privacy settings below.</Text>
      <Button title="Enable Privacy Mode" onPress={handleManagePrivacy} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Privacy;
