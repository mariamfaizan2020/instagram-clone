import React, { useEffect,useState } from 'react';
import {View,Button,ActivityIndicator} from 'react-native';


export default function landing({navigation}) {
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        setTimeout(() => {
            setLoader(false)

        }, 5000);
    })
    return (

        <View style={{flex:1 , justifyContent:'center'}}>

            {loader ? 
                <View>
                    <ActivityIndicator size={'large'} />
                    </View>
                    : 
                    <>
                    <Button 
        
                 title="Register"
                 onPress={()=>{navigation.navigate("Register")}}/>

            <Button 
                 title="Login"
                 onPress={()=>{navigation.navigate("Login")}}/>
                 </>

            }
             
        </View>
            
     
    )
    
       
}
