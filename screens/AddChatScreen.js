import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Icon, Input } from 'react-native-elements'
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    })
  }, [])
  const [input, setInput] = useState('')
  const createChat = async () => {
    await db
      .collection('chats')
      .add({
        chatName: input,
      })
      .then(() => (
        navigation.goBack()
      ))
      .catch((err) => {
        alert(err)
        console.log(err)
      })
  }
  console.log(input)
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter Chat Name"
        value={input}
        onChangeText={(text) => {
          setInput(text)
        }}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />
      <Button disabled = {!input} onPress={createChat} title="Create New Chat" />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
})
