import React, { Component } from 'react'
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser,fetchUserPosts,fetchUserFollowing} from '../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from '../components/main/Feed'
import searchScreen from '../components/main/search'
import firebase from "firebase"

import ProfileScreen from '../components/main/Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'




const Tab = createMaterialBottomTabNavigator();
const EmptyScreen=()=>{
  return null;
}
export class Main extends Component {
    componentDidMount(){
      this.props.fetchUser();
      this.props.fetchUserPosts();
      this.props.fetchUserFollowing();
      

       }
    render() {
      // const {currentUser}=this.props;
      // console.log(currentUser)

     
      // if (currentUser==undefined){
      //   return(
      //     <View></View>
      //   )
      // }

        return (
        <Tab.Navigator initialRouteName='Feed' labeled={false}>
          <Tab.Screen name="Feed" component={FeedScreen}
           options={{
             headerShown:false,
             tabBarIcon:({color,size })=>(
               <MaterialCommunityIcons name="home" color={color} size={26}/>

             )
             }}/>
              <Tab.Screen name="search" component={searchScreen} navigation={this.props.navigation}
             
           options={{
             headerShown:false,
             tabBarIcon:({color,size })=>(
               <MaterialCommunityIcons name="magnify" color={color} size={26}/>

             )
             }}/>
        <Tab.Screen name="AddContainer" component={EmptyScreen}
              listeners={({navigation}) =>({
                 tabPress:event=>{
                   event.preventDefault();
                   navigation.navigate('Add')
                 }
              }) }
           options={{
             headerShown:false,
             tabBarIcon:({color,size })=>(
               <MaterialCommunityIcons name="plus-box" color={color} size={26}/>

             )
             }}/>
              <Tab.Screen name="Profile" component={ProfileScreen}
               listeners={({navigation}) =>({
                tabPress:event=>{
                  event.preventDefault();
                  navigation.navigate('Profile',{uid:firebase.auth().currentUser.uid})
                }
             }) }
           options={{
             headerShown:false,
             tabBarIcon:({color,size })=>(
               <MaterialCommunityIcons name="account-circle" color={color} size={26}/>

             )
             }}/>
         
        </Tab.Navigator>
                
            //  <View style={{flex:1 , justifyContent:'center'}}>
               
            //    <Text>{currentUser.name} is loggedIn</Text>
            //  </View>
        )
            
        
    }
}
const mapStateToProps=(store)=>({
  currentUser:store.userState.currentUser
})
const mapDispatchProps =(dispatch)=>bindActionCreators({fetchUser,fetchUserPosts,fetchUserFollowing},dispatch)
export default connect( mapStateToProps, mapDispatchProps)(Main);
