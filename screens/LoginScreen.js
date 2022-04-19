import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signin = () => {
    auth.signInWithEmailAndPassword(email,password).catch(error =>{
      console.log(error)
      alert(error)
    })
  }
  const register = () => {
    navigation.navigate('Register')
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser)
      if (authUser) {
        navigation.replace('Home')
      }
    })
    return unsubscribe
  })

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
        }}
        style={styles.imgstyle}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text)
          }}
          style = {styles.inputContainer}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          style = {styles.inputContainer}
          type="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text)
          }}
        />
      </View>
      <Button title="Login" onPress={signin} containerStyle={styles.button} />
      <Button
        on
        title="Register"
        onPress={register}
        containerStyle={styles.button}
        type="outline"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}
export default LoginScreen
const styles = StyleSheet.create({
  imgstyle: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width : 230
  },
  button: {
    width: 200,
    marginTop: 10,
    height: 40,
  },
})
