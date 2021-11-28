import React from 'react'
import {Button, Text,View} from 'react-native'
import firebase from 'firebase';

export default function Profile() {
    return (
        <View style={{paddingTop:20,flex:1}}>
            <Text>Profile</Text>
            <View style={{position:'absolute',bottom:0,flex:1}}>
            <Button title='logout' onPress={()=> firebase.auth().signOut()}/>
            </View>
            
        </View>
    )
}
