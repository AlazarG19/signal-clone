import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import Home from './screens/Home'
import RegisterScreen from './screens/RegisterScreen'
import AddChatScreen from './screens/AddChatScreen'
import ChatScreen from './screens/ChatScreen'
const Stack = createStackNavigator()
const globalScreenOptions = {
  headerStyle : {backgroundColor : "#2C6BED"},
  headerTitleStyle :{color : "white"},
  headerTintColor : "white"
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName = {"Login"}>
        <Stack.Screen
          options={{ title: 'Login' }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name = "Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name = "Home"
          component={Home}
        />
        <Stack.Screen
          options={{ title: 'AddChat' }}
          name="AddChat"
          component={AddChatScreen}
        />
        <Stack.Screen
          options={{ title: 'Chat' }}
          name="Chat"
          
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
