import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LegalAgreement = ({ navigation }) => {
  const handleAccept = () => {
    Alert.alert("Agreement", "You have accepted the terms and conditions.");
    // Navigate to another screen or update state
  };

  const handleDecline = () => {
    Alert.alert("Agreement", "You have declined the terms and conditions.");
    // Handle decline scenario
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Agreement</Text>
      <Text style={styles.subtitle}>SecureX - Crime Reporting Safety App</Text>

      <Text style={styles.paragraph}>
        Welcome to SecureX. By using this application, you agree to the following terms and conditions. 
        SecureX provides a platform for reporting crimes and accessing safety tools. The information you
        submit may be shared with law enforcement agencies to assist in crime prevention and investigation.
      </Text>

      <Text style={styles.paragraph}>
        1. **Use of the App**: The SecureX app is intended to report crimes or suspicious activities. You are 
        responsible for ensuring that the information you provide is accurate and truthful.
      </Text>

      <Text style={styles.paragraph}>
        2. **Data Privacy**: SecureX values your privacy. Any personal data you provide will be handled in accordance 
        with our Privacy Policy. We will not share your information without your consent unless required by law.
      </Text>

      <Text style={styles.paragraph}>
        3. **Anonymity**: You have the option to report crimes anonymously. However, in some cases, sharing your 
        identity may be crucial for law enforcement.
      </Text>

      <Text style={styles.paragraph}>
        4. **Liability**: SecureX is not responsible for any harm resulting from the misuse of the app, including 
        inaccurate reports or false accusations. Ensure your reports are truthful.
      </Text>

      <Text style={styles.paragraph}>
        By tapping "Accept", you agree to the above terms and conditions. If you do not agree, tap "Decline".
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDecline}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
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
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#888',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LegalAgreement;
