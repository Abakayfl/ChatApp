import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Start = ({ navigation }) => {
  // Component State
  const [name, setName] = useState('');
  const [color, setColor] = useState('#090C08');

  const background = require('../assets/Background-image.png');

  // Event Handler (when user clicks 'Start Chatting')
  const handlePress = (text, color) => {
    if (!text) {
      return Alert.alert('Please enter a name');
    }
    navigation.navigate('Chat', { name, color });
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode='cover'
      source={background}
    >
      <Text style={styles.title}>Welcome to the Chat App</Text>
      <View style={styles.box}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder='Your Name'
          />
        </View>
        <Text style={styles.text}>Choose Background Color:</Text>
        <View style={styles.bgColorContainer}>
          <TouchableOpacity
            style={styles.color1}
            onPress={() => setColor('#090C08')}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.color2}
            onPress={() => setColor('#474056')}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.color3}
            onPress={() => setColor('#8095A5')}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.color4}
            onPress={() => setColor('#B9C6AE')}
          ></TouchableOpacity>
        </View>
        <Text style={styles.selectedColor}>Selected Color:</Text>
        <View
          style={{
            backgroundColor: color,
            borderWidth: 1,
            borderColor: '#2A323C',
            borderRadius: 5,
            width: '25%',
            height: 20,
            marginBottom: 10,
            marginLeft: 20,
          }}
        ></View>
        <TouchableOpacity
          style={styles.btnContainer}
        >
          <Text
            style={styles.btnChat}
            onPress={() => handlePress(name, color)}
          >
            Start Chating
            </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Start;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 45,
    // fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  background: {
    flex: 1,
  },
  box: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 5,
    margin: 20,
    padding: 10,
    width: '88%',
    backgroundColor: '#fff',
    textAlign: 'left',
    position: 'absolute',
    bottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  selectedColor: {
    marginBottom: 10,
    marginLeft: 20,
    color: '#757083',
    fontWeight: '300',
  },
  textInput: {
    height: 50,
    width: '90%',
    borderColor: '#2A323C',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  inputContainer: {
    flex: 0.3,
    width: '100%',
    marginBottom: 10,
  },
  bgColorContainer: {
    flex: 0.5,
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 20,
  },
  color1: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#090C08',
    marginRight: 10,
    marginTop: 10,
  },
  color2: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#474056',
    marginRight: 10,
    marginTop: 10,
  },
  color3: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#8A95A5',
    marginRight: 10,
    marginTop: 10,
  },
  color4: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#B9C6AE',
    marginRight: 10,
    marginTop: 10,
  },
  btnChat: {
    fontSize: 16,
    // fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    color: '#fff',
    padding: 20,
    textAlign: 'center',
  },
  btnContainer: {
    backgroundColor: '#757083',
    width: '88%',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10,
  },
});