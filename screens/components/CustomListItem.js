import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setChatMessage(snapshot.docs.map((doc) => doc.data()))
      })
    return unsubscribe
  }, [])

  const [chatMessage, setChatMessage] = useState([])
  // console.log(chatMessage[0].photoURL)
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessage?.[0] ?.photoURL ||
            'https://th.bing.com/th/id/OIP.C9Z29IQqhkQyKTuU__2aiQHaH_?pid=ImgDet&rs=1',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessage?.[0]?.displayName}:{chatMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
