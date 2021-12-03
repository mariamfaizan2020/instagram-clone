import React, { Component } from 'react';
import {View,Button,TextInput,StyleSheet} from 'react-native';
import firebase from "firebase"



export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            name:''
        }
        this.onSignUp= this.onSignUp.bind(this)
    }
    onSignUp()  {
        const {email,password,name} =this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result) => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error)=>{
            console.log(error)
        })
    

    }
    render() {
        return (
            <View>
                <TextInput style={styles.Input}
                placeholder='name'
                onChangeText={(name)=>this.setState({name})}/>

<TextInput  style={styles.Input}
                placeholder='email'
                onChangeText={(email)=>this.setState({email})}/>

<TextInput  style={styles.Input}
                placeholder='password'
                onChangeText={(password)=>this.setState({password})}
                 secureTextEntry={true}/>

                 <Button 
                 onPress={()=>this.onSignUp()}
                 title='signUp'/>
            </View>

        )
    }
}
const styles=StyleSheet.create({
    Input:{
        
        borderRadius:5,
        marginTop:5,
        padding:10,
        borderWidth:2,
        borderColor:'black',
        justifyContent:'center',
        alignItems:'center'
        
    }
})

export default Register
