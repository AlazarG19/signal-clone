import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect } from 'react'
import { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('')
  const sendMessage = () => {
    console.log(auth.currentUser.photoURL)
    Keyboard.dismiss()
    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      message: input,
    })
    setInput('')
    // console.log(db.collection('chats').doc(route.params.id))
  }
  const [messages, setMessages] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                'https://th.bing.com/th/id/OIP.C9Z29IQqhkQyKTuU__2aiQHaH_?pid=ImgDet&rs=1',
            }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {route.params.name}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={'white'} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 60,
            marginRight: 10,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])
  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
        ),
      )
    return unsubscribe
  }, [route])

  //   console.log(messages)
  //   console.log(route.params.name)
  // messages.map(({ id, data }) => {
  //   console.log(data)
  // })
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            
            <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email == auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={10}
                      left={-35}
                      source={{ uri: data.photoURL }}
                      rounded
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      source={{ uri: data.photoURL }}
                      rounded
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={10}
                      left={-35}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ),
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                onChangeText={(text) => setInput(text)}
                placeholder="Signal Message"
                value={input}
                style={styles.textInput}
                onSubmitEditing={sendMessage}
              />

              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2868E6" />
              </TouchableOpacity>
            </View>
            </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    height: 40,
    bottom: 0,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    marginBottom: 15,
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 10,
  },
  sender: {
    padding: 5,
    paddingRight:15,
    paddingBottom:0,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  reciever: {
    paddingLeft: 5,
    paddingRight: 15,
    paddingTop: 5,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
})
