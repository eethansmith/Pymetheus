import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList, Image } from 'react-native';

function ChatScreen({ route }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Handle incoming parameters from CameraScreen
    if (route.params?.photoUri) {
      // If there's a photo URI, add it to the messages as an image message
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), type: 'image', content: route.params.photoUri }]);
    } else if (route.params?.message) {
      // If there's a message (e.g., from a camera timeout), add it as a text message
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), type: 'text', content: route.params.message }]);
    }
  }, [route.params]);

  const sendMessage = () => {
    if (message.trim()) {
      // Add the new message to the messages state
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), type: 'text', content: message }]);
      setMessage(''); // Clear the input after sending
    }
  };

  const renderItem = ({ item }) => {
    if (item.type === 'text') {
      return <Text style={styles.messageText}>{item.content}</Text>;
    } else if (item.type === 'image') {
      return <Image source={{ uri: item.content }} style={styles.image} />;
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ios: 60, android: 500})}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{flex: 1}}
      />
      <View style={styles.inputContainer}>
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

    messageText: {
        color: '#fff',
        padding: 10,
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
        margin: 10,
    },
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
