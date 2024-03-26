import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';

function ChatScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [typingAnimationText, setTypingAnimationText] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = { id: Date.now().toString(), text: message, sender: 'user' };
      setMessages(previousMessages => [userMessage, ...previousMessages]);
      setMessage('');
  
      setIsBotTyping(true);
  
      // Animation frames
      const animationFrames = ["● ○ ○", "○ ● ○", "○ ○ ●"];
      let currentFrame = 0;
  
      // Start animation
      const animationInterval = setInterval(() => {
        setTypingAnimationText(animationFrames[currentFrame]);
        currentFrame = (currentFrame + 1) % animationFrames.length;
      }, 200); // Cycle every 500ms
  
      // Simulate delay for bot's response and stop animation
      setTimeout(() => {
        clearInterval(animationInterval); // Stop the animation
        setTypingAnimationText(""); // Clear animation text
        setIsBotTyping(false); // Hide typing indicator
        
        const botMessage = { id: (Date.now() + 1).toString(), text: "Hello", sender: 'bot' };
        setMessages(previousMessages => [botMessage, ...previousMessages]);
      }, 2000); // Adjust the delay as needed
    }
  };
  

  const attachImage = () => {
    // Placeholder for functionality to attach and send an image
    console.log('Attach image'); // For now, just log to console
    // Here, you would integrate with an image picker library
  };

  const renderMessageItem = ({ item }) => {
    // Determine the message alignment and style based on the sender
    const isUserMessage = item.sender === 'user';
    return (
      <View style={[
        isUserMessage ? styles.userMessageBubble : styles.botMessageBubble,
        { alignSelf: isUserMessage ? 'flex-start' : 'flex-end' } // User messages to the right, bot messages to the left
      ]}>
        <Text style={isUserMessage ? styles.userMessageText : styles.botMessageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ios: 60, android: 500})}
    >
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        inverted
      />

    {isBotTyping && (
      <View style={styles.typingIndicator}>
        <Text style={styles.typingText}>{typingAnimationText}</Text>
      </View>
    )}

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
  userMessageBubble: {
    backgroundColor: '#333',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-start', 
  },
  userMessageText: {
    color: '#fff',
    fontSize: 16,
  },

  botMessageBubble: {
    backgroundColor: '#ea80fc', 
    padding: 10,
    margin: 5,
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-start', 
  },
  botMessageText: { 
    color: '#202124',
    fontSize: 16,
  },
  typingIndicator: {
    padding: 10,
    
    backgroundColor: '#ea80fc', // Use a subtle color or animation
    margin: 5,
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-end', // Or 'flex-end' depending on where you want it
  },
  typingText: {
    color: '#202124',
    fontSize: 16,
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