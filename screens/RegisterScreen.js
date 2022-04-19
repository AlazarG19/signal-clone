import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useState,useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle:"Back to Login"
    })
  }, [navigation])
  const register = () => {
    const updated = { displayName : name, photoURL : imageUrl}
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser =>{
      // console.log(name)
      // console.log(imageUrl)
      // console.log(updated)
      authUser.user.updateProfile(updated)
      // authUser.user.updateProfile({
      //   displayName:name,
      //   photoURL:imageUrl||"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
      // })
      // console.log(authUser.user)
    })
    .catch((error)=>{
      alert(error.message) 
      console.log(error.message)
    })
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text} h4>
        Create a signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => {
            setName(text)
          }}
        />
        <Input
          placeholder="Email"
          type="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text)
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text)
          }}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => {
            setImageUrl(text)
          }}
          onSubmitEditing={register}
        />
        <Button
        
          onPress={register}
          style={styles.button}
          title={'Register'}
        ></Button>
      </View>
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 20,
  },
  inputContainer: { width: 300 },
  button: {
    width: 20,
    marginTop: 10,
  },
})
