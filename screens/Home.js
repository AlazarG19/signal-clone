import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useEffect,useState } from 'react'
import { auth, db } from '../firebase'
import CustomListItem from './components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

// fixing the time out line
import {Platform, InteractionManager} from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
// end
const Home = ({ navigation }) => { 
  const [chats, setChats] = useState([])
  useEffect(()=>{
    const unsubscribe = db.collection('chats').onSnapshot(snapshot =>{
      setChats(snapshot.docs.map( doc =>({
        id : doc.id,
        data : doc.data()
      })))
    })
    return unsubscribe
  },[])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{  marginLeft:10}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity = {.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight : () =>(
        <View style = {{
          flexDirection : "row",
          justifyContent : "space-between",
          width : 80,
          marginRight : 10
        }} >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color = "black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}
            onPress = {()=>{navigation.navigate("AddChat")}}
          >
            <SimpleLineIcons name = "pencil" size={24} color = "black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])
  const signOutUser = () => (
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  )
  const enterChatName = (id,name)=>(
    navigation.navigate('Chat',{
      id,name}
  ))
  
  return (
    <SafeAreaView>
      <ScrollView style  = {styles.container}>
        {chats.map((chat)=>(
        <CustomListItem key = {chat.id} id = {chat.id} chatName = {chat.data.chatName} enterChat = {enterChatName}/>
  ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container : {
    height : "100%"
  }
})
