import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      uid: 0,
      isConnected: false,
      image: null,
      location: null,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyABzyISaMqz9invgJPCr22HInk4j6pbSLg",
      authDomain: "chatapp-7fb92.firebaseapp.com",
      projectId: "chatapp-7fb92",
      storageBucket: "chatapp-7fb92.appspot.com",
      messagingSenderId: "911825035847",
      appId: "1:911825035847:web:8d7d931366a8a1f1f68762",
      measurementId: "G-GWLPJXHSNL"
    };

    // Connect to Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatUser = null;
    // Reference to the messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || '',
      user: message.user,
      image: message.image || '',
      location: message.location || null,
    });
  }

  // Event handler for sending messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
        this.saveMessages();
      });
  }

  async getMessages() {
    let messages = [];
    // Catch errors with 'try' and 'catch'
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete messages in client-side storage
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        // firebase.auth calls the firebase auth service for the app
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          this.setState({
            isConnected: true,
            user: {
              _id: user.uid,
              name: this.props.route.params.name,
              avatar: 'https://placeimg.com/140/140/any'
            },
            messages: [],
          });
          // Calling onSnapshot function to receive updated data
          this.referenceChatMessages = firebase.firestore().collection('messages');
          this.unsubscribeChatUser = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // Stops listening for authentication
    this.unsubscribeChatUser();
    // Stops listening for changes
    this.authUnsubscribe();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          // Change background color of right message bubble
          right: {
            backgroundColor: '#25d366'
          },
        }}
      />
    );
  }

  // Renders message input only when app is online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          user={{
            _id: this.state.uid,
            avatar: 'https://placeimg.com/140/140/any',
            name: name,
          }}
        />
        {/* Android keyboard fix */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}