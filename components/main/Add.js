import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button ,Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Add({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);
  const takePicture=async()=>{
     if(camera){
         const data =await camera.takePictureAsync(null)
        setImage(data.uri)
     }}
     
     const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
           
          setImage(result.uri);
        }
      };
    


  if ( hasCameraPermission=== null ||  hasGalleryPermission=== false) {
    return <View />;
  }
  if ( hasCameraPermission=== false ||  hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera 
      ref={ref=>setCamera(ref)}
      style={styles.camera}
       type={type}
       ratio={'1:1'}>
       
      </Camera>
      
       <View >
         <Button
          style={styles.button}
          title='Flip'
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
         </Button>
         <Button 
         title='Take Picture'
         onPress={()=>takePicture()}/>
          <Button 
         title='Pick Image From Gallery'
         onPress={()=>pickImage()}/>
          <Button
         title='Save'
         onPress={()=>navigation.navigate('SAVE',{image})}/>

         {image && <Image source={{uri:image}} style={{flex:1}}/>}
        
       
        </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
    container:{
        flex:1,
        flexDirection:'row'
        
    },
    camera:{
        flex:1,
        aspectRatio: 1
    },
    button:{
        flex:0.1,
        alignSelf:'flex-end',
        alignItems:'center'
    }
    
 }); 