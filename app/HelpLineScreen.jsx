// app/helplinecontacts.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Colors from './../constants/Colors'

const helplineContacts = [
  { id: '1', name: 'Police', number: '100' },
  { id: '2', name: 'Ambulance', number: '102' },
  { id: '3', name: 'Fire', number: '101' },
  { id: '4', name: 'Disaster Management', number: '108' },
  { id: '5', name: 'Women Helpline', number: '1091' },
  { id: '6', name: 'Child Helpline', number: '1098' },
  { id: '7', name: 'Senior Citizen Helpline', number: '14567' },
  // Add more contacts as needed based on the emergency contact link provided
];

const HelplineContacts = () => {
  const makeCall = (number) => {
    const url = `tel:${number}`;
    Linking.openURL(url).catch((err) => console.log('Error occurred while making a call', err));
  };

  const renderContact = ({ item }) => (
    <View style={
      
      styles.contactContainer
      }>
      <Text style={styles.contactText}>{item.name}: {item.number}</Text>
      <TouchableOpacity style={styles.callButton} onPress={() => makeCall(item.number)}>
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Helpline Contacts</Text>
      <FlatList
        data={helplineContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',

    
  },
  heading: {
    color: 'red',
    marginTop: 55,
    fontSize: 24,
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F2E5BF',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  contactText: {
    fontSize: 16,
    fontFamily: 'outfit-medium'
  },
  callButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HelplineContacts;
