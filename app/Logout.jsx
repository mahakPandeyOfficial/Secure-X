import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

const Logout = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      alert('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;
