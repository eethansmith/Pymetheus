import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Button to navigate to Camera Screen */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>PYMETHEUS</Text>
      </TouchableOpacity>

      {/* Additional button to navigate to Chat Screen */}
      <TouchableOpacity 
        style={[styles.button, styles.buttonSpacing]} 
        onPress={() => navigation.navigate('Chat')}
      >
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent', // Transparent background
    padding: 10,
    borderRadius: 5,
    borderWidth: 2, // Border width for the outline
    borderColor: '#bdc1c6', // Border color
    marginTop: 20, // Add some spacing between the buttons
  },
  buttonText: {
    color: '#ea80fc', // Button text color
    fontSize: 18, // Font size
    fontFamily: 'Avenir', // Font family (ensure the font is available)
  },
  buttonSpacing: {
    marginTop: 20, // Adds spacing between buttons
  },
});

export default HomeScreen;
