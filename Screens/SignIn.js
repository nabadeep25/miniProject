
import React,{useState} from 'react'
import {StyleSheet,Image, View} from 'react-native'
import {Text,Form,Input,Item,Button,H1,Spinner} from 'native-base'
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'

export default function SignIn({navigation,route}) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [isloading,setIsloading]=useState(false)
    const [user,setUser]=useState('')

    const signin=async()=>{
      if(email && password) {
           setIsloading(true);
 await auth().signInWithEmailAndPassword(email,password).then((data)=>{
 
 setUser(data.user.email)
 navigation.navigate('Tab',{screen:'notification'})
//  Snackbar.show({
//     text:'Signed in sucessfully',
//     backgroundColor:'green'
// })
 setIsloading(false);
  }).catch((err)=>{
      Snackbar.show({
          text:err.message,
          backgroundColor:'red'
      })
  })

  setIsloading(false)
}
  else{
Snackbar.show({
    text:"Enter all fields",
    backgroundColor:'red'
})
  }
    }
    
if(isloading){
        return(
            <View style={{flex:1}}>
                <Spinner />

            </View>
        )
    }
   
  return (
   
            <View style={{flex:1},styles.container}>
            <H1 style={styles.title}>Mini Project</H1>
            <Image source={require("../assets/welcome.png")}
             style={{resizeMode:'center',height:200,alignSelf:'center'}} />
           
           <Form style={{flex:1}}>
                <Item style={styles.item}>
                    <Input
                    placeholder='Email'
                    value={email}
                    style={{}}
                    onChangeText={(t)=>setEmail(t)}
                    />
                </Item>
                <Item style={styles.item} >
                    <Input
                    placeholder='Password'
                    value={password}
                    style={{}}
                    onChangeText={(t)=>setPassword(t)}
                    secureTextEntry={true}
                    />
                </Item>
                <Button success style={{marginBottom:10}} block rounded onPress={signin}>
                    <Text>SignIn</Text>
                </Button>
                <Button style={{marginBottom:10}} block rounded onPress={()=>navigation.navigate('signup')}>
                    <Text>Create Account</Text>
                </Button>
                <Button warning style={{marginBottom:10}} block rounded onPress={()=>navigation.navigate('forgot')}>
                    <Text>Forgot password</Text>
                </Button>
            </Form>
            </View>
    
  );
}
  

const styles=StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
padding:10,

},
title:{
    textAlign:'center',
    padding:10,
    marginBottom:20
},

item:{
    marginBottom:10
}
})