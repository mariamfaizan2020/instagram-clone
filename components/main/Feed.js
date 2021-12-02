import React,{useState,useEffect}from 'react'
import {Button, Text,View,Image,FlatList,StyleSheet} from 'react-native'
import firebase from 'firebase';
require('firebase/firestore')

import {connect} from 'react-redux'

function Feed(props) {
    const [posts,setPosts] = useState([]);
    
    useEffect(()=>{
         if(props.usersFolowingLoaded== props.following.length && props.following.length !==0){


            // for (let i= 0; i< props.following.length; i++){
            //     const user=props.users.find(el=>el.uid===props.following[i]);
            //     if(user != undefined){
            //         console.log('user:',user)
            //         posts=[...posts,...user.posts]
            //     }
            // }
                 props.feed.sort(function(x,y){
                return x.creation - y.creation;
                // posts.sort(function(x,y){
                //     return x.creation - y.creation;
                })
            
            
            setPosts(props.feed)
        }
        console.log('POSTS:',posts)

        
    },[props.usersFolowingLoaded,props.feed])
  
    
    
    return (
        <View style={styles.container}>
             <View style={styles.containerGallery}>
                 <FlatList
                 numColumns={1}
                 horizontal={false}
                 data={posts}
                 renderItem={({item})=>(
                   <View style={styles.containerImage}>
                       <Text style={styles.container}>{item.user.name}</Text>
                        <Image 
                     style={styles.image}
                     source={{uri :item.downloadURL}}/>
                     <Text 
                        onPress={()=>props.navigation.navigate('Comment',
                       {postId:item.id,uid:item.user.uid})
                      }>
                         View Comments....</Text>
                   </View>
                    
                 )}/>


             </View>
            
            
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
       
    },
    containerInfo:{
        margin:20
    },
    containerGallery:{
        flex:1
    },
    image:{
        flex:1,
        aspectRatio:1/1
    },
    containerImage:{
        flex:1/3
    }
})
const mapStateToProps=(store)=>({
    currentUser:store.userState.currentUser,
    following:store.userState.following,
    feed: store.usersState.feed,
    usersFolowingLoaded: store.usersState.usersFolowingLoaded,
})
export default connect(mapStateToProps,null)(Feed);