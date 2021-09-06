import React, { useEffect,useState } from 'react';
import { Text, View,ScrollView,StyleSheet, Alert,FlatList } from 'react-native';
import database from '@react-native-firebase/database'
import { Textarea ,Form,Item,Button, Card, CardItem} from 'native-base';
import shortid from 'shortid'
import Snackbar from 'react-native-snackbar';

export default function TextScreen({navgation,route})
 {
   


  const [text, settext] = useState("");
  const [messages, setmessages] = useState([])
  console.log(messages)
  const send=async ()=>{
    if(text) {
      var id=shortid.generate();
    await database().ref(`/texts/`).set({
      message:text,
      
    }).then(res=>settext('')).catch(err=>Alert.alert("Error"))
      
    } else{
      Snackbar.show({
        text:'Empty message',
        backgroundColor:'red'
      })
    }
  }
useEffect(() => {
  const subscriber = database().ref(`/texts/`).on("value",(snapshot)=>{
    if(snapshot.exists())
    setmessages(snapshot.val())
    
  })


//return () => subscriber();
}, [])
  return (
    <View style={{ flex: 1,justifyContent:"center",}}>
    <View>
 
   
     <CardItem style={styles.carditem}>
  <Text style={{fontSize:20}}>{messages.message}</Text>
     </CardItem>
   
    </View>
      <Form style={{}}>
            <Item style={styles.item} >  
               <Textarea style={{}} value={text} onChangeText={(t)=>{settext(t)}} placeholder="Write here" />
               </Item>
          <Button   style={{backgroundColor:'#00D84A',padding:20 ,alignSelf:'center',borderRadius:5}} onPress={send}>
                     <Text>SEND</Text>
                 </Button>
     </Form>
  </View>
  );
}
const styles=StyleSheet.create({
    
item:{
      backgroundColor:'white',
      margin:10,
      borderRadius:10
  },
  
  carditem:{
    backgroundColor:"#A3CB38",
    marginLeft:10,
    marginRight:10,
    borderRadius:10
  }
   
  })