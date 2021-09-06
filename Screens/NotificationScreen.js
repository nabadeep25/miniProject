import React ,{useEffect} from 'react';
import { Text, View ,BackHandler} from 'react-native';
import {Button} from 'native-base'
import PushNotification from 'react-native-push-notification'
import auth from '@react-native-firebase/auth'
PushNotification.configure({
    onNotification:function(notification){
        console.log("Notification",notification);
        notification.finish()
    },
 
})
PushNotification.createChannel({
    channelId:"Mychannel123",
    channelName:'Mini Project',
    
},(created)=>{})

export default function NotificationScreen({navigation}) {
   const pushnotification=()=>{
    PushNotification.localNotification({
        channelId:"Mychannel123",
        title: "Hello from the App", 
        message: "This message is from MiniProject App",
    })
   }
    
  
    useEffect(() => {
       BackHandler.addEventListener("hardwareBackPress",BackHandler.exitApp)
       
      
      }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent:'center', }}>
    <Button success onPress={()=>{pushnotification()} } danger rounded style={{alignSelf:'center',padding:20}}>
        <Text style={{fontSize:28,textAlignVertical:'center'}}>Notification</Text>
    </Button>
    <Button warning style={{alignSelf:'center',padding:20,margin:20,borderRadius:10}} onPress={()=>{auth().signOut().then(res=>navigation.navigate("signin"))}}>
        <Text style={{textAlignVertical:'center',}}>Signout</Text>
    </Button>
  </View>
  );
}
