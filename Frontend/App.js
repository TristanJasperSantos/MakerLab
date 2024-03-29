import React, { useEffect, useContext } from 'react';
import HomePage from './screens/HomePage';
import Login from './screens/auths/Login';
import Signup from './screens/auths/Signup';
import Welcome from './screens/auths/Welcome';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import AuthProvider, {AuthContext} from './context/AuthProvider';  
import { Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Learn from './screens/Learn';
import Settings from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assess from './screens/Assess';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabGroup = ()=>{
  const {logout} = useContext(AuthContext)
    return(
      <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name !== 'Learn') {
            if (route.name === 'HomePage') {
              iconName = focused ? 'home': 'home-outline';
            } else if (route.name === 'Assess') {
              iconName = focused ? 'book': 'book-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings': 'settings-outline';
            } 
            return <Ionicons name={iconName} size={23} color={'black'}/>
          }  
          else if (route.name === 'Learn') {
            iconName = focused ? 'school': 'school-outline';
            return <Ionicons name={iconName} size={25} color={'black'}/>
          }
        }
      })}
      >

      <Tab.Screen options={{headerShown:false}} name='HomePage' component={HomePage} />
      <Tab.Screen options={{headerShown:false}} name='Learn' component={Learn}/>
      <Tab.Screen options={{headerShown:false}} name='Assess' component={Assess}/>
      <Tab.Screen options={{
        headerTitle: "Settings",
        headerRight: ()=>(
        <Pressable onPress={logout}>
          <Text>Logout</Text>
        </Pressable>)
      }} name='Settings' component={Settings}/>
    </Tab.Navigator>
    )
}

const AuthStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name='Welcome' component={Welcome}/>
      <Stack.Screen options={{headerShown:false}} name='Signup' component={Signup}/>
      <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/> 
    </Stack.Navigator>
  )
}
// const AuthenticatedStack = () => {
//   const {logout} = useContext(AuthContext)
//   return(
//     <Stack.Navigator>
     
//     </Stack.Navigator>
//   )
// }
const Navigation = () => {
  const authContext = useContext(AuthContext)

  return(
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack/>}
      {authContext.isAuthenticated &&  <TabGroup/>}
    </NavigationContainer>
  )
}
const Root = ()=>{
  const authContext = useContext(AuthContext)

  useEffect(()=>{
    const fetchToken = async()=>{
        const token = await AsyncStorage.getItem('token')
        
        if (token) {
            authContext.authenticate(token)
        }else{
            console.log("no token found")
        }
    }
    fetchToken()
  },[])

  return <Navigation/>
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Root/>
      </PaperProvider>
    </AuthProvider>
  );
}
