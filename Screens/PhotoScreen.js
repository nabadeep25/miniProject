
import React, { useState ,useEffect} from 'react';
import { Text,Image, View,PermissionsAndroid,ToastAndroid } from 'react-native';
import {Button, Spinner} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
import shortid from 'shortid'
import abc from '../assets/abc.png'


export default function PhotoScreen() {

    const [imageuri, setimageuri] = useState('')
    const [imageloaded, setimageloaded] = useState(false);
 
    // database().ref('/users').once('value',(snapshot)=>{
    //   if(snapshot.exists){
    //     console.log(snapshot.val())
    //   }
    // })

    const uploadimage= (name,path)=>{
      storage().ref(`/image/${name}`).putFile(path).on('state_changed',(snapshot)=>{
        var url=snapshot.ref.getDownloadURL()
        setimageuri({uri:url});
      })
    }
    const geturi=(name)=>{
      let url = storage().ref(`/image/${name}`).getDownloadURL();
      console.log("URL Is",url)
          
    }
useEffect(() => {
  setimageuri(abc)
  console.log("abc",abc)
  setimageloaded(false)
  
}, [])
 

    
   
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor:'#33d9b2',alignItems:'center' }}>
     
       <Image  style={{flex:1,width:400,resizeMode:'contain',margin:20}} source={imageuri}/>
    
     
    <View style={{flex:1,marginTop:20,justifyContent:'flex-start'}}>
    <Button  style={{alignSelf:'center',marginBottom:20,padding:20,borderRadius:10,backgroundColor:'#ff793f'}}
    onPress={()=>{
      ImagePicker.openPicker({
        
        cropping: true
      }).then(image => {
        console.log(image);
        setimageuri({uri:image.path})
        uploadimage(image.filename,image.path);
        setimageloaded(true)
      });

    }}><Text style={{fontSize:22}}>{imageloaded?"Replace":"Upload"} from Gallery</Text></Button>

      <Button style={{alignSelf:'center',marginBottom:20,padding:20,borderRadius:10,backgroundColor:'#cc8e35',} }
    onPress={()=>{
      ImagePicker.openCamera({
      
        cropping: true,
      }).then(image => {
        console.log(image);
       // setimageuri({uri:image.path})

        uploadimage(shortid.generate(),image.path);
        setimageloaded(true)
      });
    }}><Text style={{fontSize:22}}>{imageloaded?"Replace":"Upload"} from Camera</Text></Button>
    </View>

  </View>
  );
}