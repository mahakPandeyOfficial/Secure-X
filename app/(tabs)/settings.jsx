import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

// Settings Component
const Settings = ( ) => {
  const navigation = useNavigation();
  // Sections for the settings menu
  const sections = [
    {
      title: 'Account',
      data: [
        { label: 'Edit profile', icon: <Ionicons name="person-circle-outline" size={24} color="black" />, route: 'EditProfile' },
        { label: 'Security', icon: <MaterialIcons name="security" size={24} color="black" />, route: 'Security' },
        { label: 'Notifications', icon: <Ionicons name="notifications-outline" size={24} color="black" />, route: 'Notifications' },
        { label: 'Privacy', icon: <MaterialIcons name="lock-outline" size={24} color="black" />, route: 'Privacy' },
      ]
    },
    {
      title: 'Support & About',
      data: [
        { label: 'My Subscription', icon: <MaterialIcons name="subscriptions" size={24} color="black" />, route: 'Subscription' },
        { label: 'Help & Support', icon: <Ionicons name="help-circle-outline" size={24} color="black" />, route: 'HelpSupport' },
        { label: 'Terms and Policies', icon: <FontAwesome5 name="file-contract" size={24} color="black" />, route: 'TermsPolicies' },
      ]
    },
    {
      title: 'Cache & Cellular',
      data: [
        { label: 'Free up space', icon: <Ionicons name="trash-outline" size={24} color="black" />, route: 'FreeSpace' },
        { label: 'Data Saver', icon: <MaterialIcons name="data-usage" size={24} color="black" />, route: 'DataSaver' },
      ]
    },
    {
      title: 'Actions',
      data: [
        { label: 'Report a problem', icon: <Entypo name="warning" size={24} color="black" />, route: 'ReportProblem' },
        { label: 'Add account', icon: <Ionicons name="person-add-outline" size={24} color="black" />, route: 'AddAccount' },
        { label: 'Log out', icon: <MaterialIcons name="logout" size={24} color="black" />, route: 'Logout' },
      ]
    }
  ];

  // Render each setting option
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.route)}>
      {item.icon}
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  // Render the header for each section
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.label + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

// Style Definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginTop: 50,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default Settings;
