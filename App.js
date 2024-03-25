import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Customizable button */}
      <TouchableOpacity style={styles.button} onPress={() => alert("Button Pressed")}>
        <Text style={styles.buttonText}>PYMETHEUS</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
    borderColor: '#bdc1c6', // Border color matching the background
  },
  buttonText: {
    color: '#ea80fc', // Button text color
    fontSize: 18, // Font size
    fontFamily: 'Avenir', // Font family (make sure the font is available)
  },
});
