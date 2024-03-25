import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

function ChatScreen({ navigation }) {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // Handle the message sending logic here
    console.log(message); // For example: log the message to console
    setMessage(''); // Clear the input after sending
  };

  const attachImage = () => {
    // Placeholder for functionality to attach and send an image
    console.log('Attach image'); // For now, just log to console
    // Here, you would integrate with an image picker library
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ios: 60, android: 500})}
    >
      <View style={{flex: 1}}> 
        {/* Chat content goes here */}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={attachImage} style={styles.attachButton}>
          <Text style={styles.attachButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  attachButton: {
    marginRight: 10,
    backgroundColor: '#ea80fc',
    borderRadius: 20,
    padding: 10,
  },
  attachButtonText: {
    color: '#202124',
    fontSize: 24,
    fontFamily: 'Avenir', // Ensure this font is available or choose another
  },
  textInput: {
    flex: 1,
    backgroundColor: '#444',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#ea80fc',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#202124',
    fontSize: 16,
    fontFamily: 'Avenir', // Ensure this font is available or choose another
  },
});

export default ChatScreen;
