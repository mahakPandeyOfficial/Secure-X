import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const Subscription = () => {
  const { user, isLoaded } = useUser();

  const handleManageSubscription = () => {
    // Logic to manage subscription
    alert('Navigating to subscription management...');
  };

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your current subscription: Premium Plan</Text>
      <Button title="Manage Subscription" onPress={handleManageSubscription} />
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

export default Subscription;
