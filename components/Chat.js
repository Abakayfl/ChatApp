import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyB9TZiLRk-tY5Ij7P2qABveGzFxslPP2bU",
      authDomain: "test-be478.firebaseapp.com",
      projectId: "test-be478",
      storageBucket: "test-be478.appspot.com",
      messagingSenderId: "445563747446",
      appId: "1:445563747446:web:bd493792f50063c60bb357",
      measurementId: "G-LNZM1J2EK3"
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
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        name: data.name,
        items: data.items.toString(),
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
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  componentDidMount() {


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
        },
        messages: [],
      });
      // Calling onSnapshot function to receive updated data
      this.referenceChatMessages = firebase.firestore().collection('messages');
      this.unsubscribeChatUser = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
    });
  }



  componentWillUnmount() {
    // Stops listening for authentication
    this.unsubscribeChatUser();
    // Stops listening for changes
    this.authUnsubscribe();
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
          user={{
            _id: 1,
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



