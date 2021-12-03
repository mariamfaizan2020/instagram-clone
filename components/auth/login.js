import React, { Component } from 'react';
import {View,Button,TextInput,StyleSheet} from 'react-native';
import firebase from "firebase"



export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
            
        }
        this.onSignIn= this.onSignIn.bind(this)
    }
    onSignIn()  {
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
            <View style={{flex:1, justifyContent:'center'}}>
               
              <TextInput style={styles.Input}
                placeholder='email'
                value={email}
                onChangeText={(email)=>this.setState({email})}/>

              <TextInput style={styles.Input}
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
   

export default Login
