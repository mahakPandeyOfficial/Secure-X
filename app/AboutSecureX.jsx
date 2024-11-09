import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AboutSecureX = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About SecureX</Text>
      <Text style={styles.paragraph}>
        SecureX is a cutting-edge mobile application designed to enhance safety and security by providing 
        users with the ability to report crimes and suspicious activities directly from their mobile devices.
      </Text>

      <Text style={styles.paragraph}>
        Our mission is to empower citizens to take control of their safety by offering tools such as an SOS 
        button, live location sharing, and real-time crime alerts. SecureX collaborates with local law 
        enforcement to ensure that reports are handled efficiently and promptly.
      </Text>

      <Text style={styles.paragraph}>
        Whether you are reporting a minor incident or seeking help during an emergency, SecureX is here to 
        assist you in staying safe. Your information is protected, and you can choose to report incidents 
        anonymously if you wish.
      </Text>

      <Text style={styles.paragraph}>
        Our goal is to build safer communities through technology, allowing everyone to contribute to 
        creating a more secure environment.
      </Text>

      <Text style={styles.subTitle}>Key Features</Text>
      <Text style={styles.bullet}>• Report crimes and suspicious activities easily</Text>
      <Text style={styles.bullet}>• Live location sharing with emergency contacts</Text>
      <Text style={styles.bullet}>• Real-time alerts on nearby incidents</Text>
      <Text style={styles.bullet}>• Anonymous reporting options</Text>

      <Text style={styles.paragraph}>
        SecureX is built with user privacy and security in mind. Your data is handled with care, 
        and we are committed to maintaining the highest standards of integrity.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1E5D1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginTop: 40,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'serif',
    marginBottom: 15,
    lineHeight: 22,
    color: '#555',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  bullet: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    paddingLeft: 10,
  },
});

export default AboutSecureX;
