import React, { Component } from 'react';
import {View,Button,TextInput} from 'react-native';
import firebase from "firebase"



export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'test@gmail.com',
            password:'123456'
            
        }
        this.onSignIn= this.onSignIn.bind(this)
    }
    onSignIn()  {
        console.log("called")
        const {email,password} =this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
            console.log(result)
        })
        .catch((error)=>{
            console.log(error)
        })
    

    }
    render() {
        const {email,password} =this.state;
        return (
            <View>
               
              <TextInput 
                placeholder='email'
                value={email}
                onChangeText={(email)=>this.setState({email})}/>

              <TextInput 
                placeholder='password'
                value={password}
                onChangeText={(password)=>this.setState({password})}
                 secureTextEntry={true}/>

                 <Button 
                 onPress={()=>this.onSignIn()}
                 title='signIn'/>
            </View>

        )
    }
}

export default Login
