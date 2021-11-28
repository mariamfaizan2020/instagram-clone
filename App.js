import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/landing';
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/login'
import MainScreen from './components/Main'
import  firebase from 'firebase'
import { View ,Text} from 'react-native';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import AddScreen from './components/main/Add'
const store = createStore(rootReducer, applyMiddleware(thunk))



const firebaseConfig = {
  apiKey: "AIzaSyCRxG07h5m4Yu4E9yqCfoD6aO1CYQaXILI",
  authDomain: "instagram-dev-3446a.firebaseapp.com",
  projectId: "instagram-dev-3446a",
  storageBucket: "instagram-dev-3446a.appspot.com",
  messagingSenderId: "813838123794",
  appId: "1:813838123794:web:79e876452b859682bb29cb",
  measurementId: "G-89DHB0R97Y"
};

//initializing app

if (firebase.apps?.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const Stack= createStackNavigator()


export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded: false ,
      loggedIn:false
      
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
      this.setState({
        loggedIn:false,
        loaded:true
      })
    }else {
      this.setState({
        loggedIn:true,
        loaded:true
      })
    }
   })
  }
  render() {
    const {loggedIn, loaded}= this.state
    if(!loaded){
      return(
      <View style={{flex:1, justifyContent:'center'}}>
        <Text>Loading</Text>
      </View>)
    }
    if(!loggedIn){
    return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
    }
    return(
      <Provider store ={store}>
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Add" component={AddScreen} />
         </Stack.Navigator>
       </NavigationContainer>
      </Provider>
      
      )


    
  }
}

export default App



