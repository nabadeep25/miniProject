
import React,{useState} from 'react'
import {StyleSheet,Image, ScrollView, View} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1,Spinner} from 'native-base'
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'
import shortid from 'shortid'

export default function SignUp({navigation,route}) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [isloading,setIsloading]=useState(false)
    const [user,setUser]=useState('')

    const signup=()=>{
        if(email && password){setIsloading(true);
  auth().createUserWithEmailAndPassword(email,password).then((data)=>{
      let id=shortid.generate();
      database().ref(`users/${id}`).set({
          id:id,
          email:email,
          

      })
 
 setUser(data.user.email)
 navigation.navigate('Tab',{screen:"notification"})
//  Snackbar.show({
//      text:'Account created sucessfully',
//      backgroundColor:'green'
//  })
 setIsloading(false);
  }).catch((err)=>{
      Snackbar.show({
          text:err.message,
          backgroundColor:'red'
      })
  })

  setIsloading(false)
}else{
    Snackbar.show({
        text:'Empty fields',
        backgroundColor:'red'
    })
}
    }
    if(isloading){
        return(
            <View style={styles.container}>
                <Spinner />

            </View>
        )
    }
  return (
    <>
     <Container style={styles.container}>
            <ScrollView>
            <H1 style={styles.title}>Mini Project</H1>
            <Image source={require("../assets/welcome.png")}
             style={{resizeMode:'center',height:200,alignSelf:'center'}} />
           
           <Form>
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
                <Button success style={{marginBottom:10}} block rounded onPress={signup}>
                    <Text>SignUp</Text>
                </Button>
                <Button style={{marginBottom:10}} block rounded onPress={()=>navigation.navigate('signin')}>
                    <Text>SignIn</Text>
                </Button>
            </Form>
            </ScrollView>
        </Container>
    
    </>
  );
}
  

const styles=StyleSheet.create({
container:{
flex:1,
justifyContent:'flex-start',
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