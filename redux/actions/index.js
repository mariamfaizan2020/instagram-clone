import firebase from 'firebase';
import { USER_STATE_CHANGE ,USER_POSTS_STATE_CHANGE,USER_FOLLOWING_STATE_CHANGE,USERS_LIKES_STATE_CHANGE,USERS_DATA_STATE_CHANGE,USERS_POSTS_STATE_CHANGE,CLEAR_DATA} from '../constants/index';


export function clearData(){
    return((dispatch)=>{
        dispatch({ type: CLEAR_DATA}) 
    })
}
    

export function fetchUser(){
    return((dispatch)=>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
              
                dispatch({type:USER_STATE_CHANGE, currentUser:snapshot.data()})
            
         
            }else{
                console.log('Does not exist')
            }
        })

    })
}

export function fetchUserPosts(){
    return((dispatch)=>{
       
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy("creation","asc")
        .get()
        .then((snapshot)=>{
            let posts= snapshot.docs.map(doc=>{
                const data= doc.data(); 
                const id= doc.id;
                return{id,...data}
            })
        
           dispatch({type: USER_POSTS_STATE_CHANGE, posts})
            
            
        })

    })
}

export function fetchUserFollowing(){
    return((dispatch)=>{
        firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot)=>{
            let following= snapshot.docs.map(doc=>{
               const id= doc.id;
                return id
            })
          
           dispatch({type: USER_FOLLOWING_STATE_CHANGE, following })
           for(let i=0; i<following.length; i++){
               dispatch(fetchUsersData(following[i],true))
           }
            
            
        })

    })
}

export function fetchUsersData(uid,getPosts){
    return((dispatch,getState)=>{
        //el=elemnt .this function is to check whether the provided uid is found in the users array from users.js or not
        const found=getState().usersState.users.some(el=>el.uid===uid);

        if(!found){
            firebase.firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((snapshot)=>{
                if(snapshot.exists){
                    let user =snapshot.data();
                    user.uid = snapshot.id
                   dispatch({type:USERS_DATA_STATE_CHANGE, user})
                   
                
             
                }else{
                    console.log('Does not exist')
                }
                if(getPosts){
                    dispatch(fetchUsersFollowingPosts(uid))
                }
            })
    
        }
    })
     }

     export function fetchUsersFollowingPosts(uid){
         console.log("uidddddd",uid)
        return((dispatch,getState)=>{
       
            firebase.firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .orderBy("creation","asc")
            .get()
            .then((snapshot)=>{

                //  const uid =  snapshot.query._.C.path.segments[1];
                //  console.log({snapshot, uid});
                 const user=getState().usersState.users.find(el=>el.uid===uid);
  

                let posts= snapshot.docs.map(doc=>{
                    const data= doc.data(); 
                    const id= doc.id;
                    return{id,...data,user}
                })
            
               for(let i=0; i < posts.length; i++){
                   dispatch(fetchUsersFollowingLikes(uid,posts[i].id))
               }
               dispatch({type: USERS_POSTS_STATE_CHANGE, posts,uid});
          
              
               
                
                
            })
    
        })
    }

    export function fetchUsersFollowingLikes(uid,postId){
        return((dispatch,getState)=>{
      
           firebase.firestore()
           .collection('posts')
           .doc(uid)
           .collection('userPosts')
           .doc(postId)
           .collection('likes')
           .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot)=>{
                // console.log("snapshot1234",snapshot)
                //   const postId=  snapshot.query.ZE.path.segments[3];
                  console.log('POSTID:',postId)

                  let currentUserLike= false;
                  if(snapshot.exists){
                      currentUserLike=true;
                      console.log('likesValue',currentUserLike)
                  }

                
              dispatch({type: USERS_LIKES_STATE_CHANGE, postId,currentUserLike});
              
             
              
               
               
           })
   
       })
   }