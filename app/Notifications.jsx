import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const Notifications = () => {
  const { user, isLoaded } = useUser();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleNotifications = async () => {
    try {
      setIsNotificationsEnabled(!isNotificationsEnabled);
      // Save notification preference
      await user.update({
        publicMetadata: {
          notificationsEnabled: !isNotificationsEnabled,
        },
      });
      alert('Notification preferences updated!');
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      alert('Failed to update preferences.');
    }
  };

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enable Notifications:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleNotifications}
        value={isNotificationsEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
});

export default Notifications;
