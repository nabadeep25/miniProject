
import React,{useState} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'
import {Text,Container,Form,Input,Item,Button,H1,Spinner} from 'native-base'
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'

export default function Forgot({navigation,route}) {
    const [email,setEmail]=useState('')
  
    const [isloading,setIsloading]=useState(false)
    

    const forgot=()=>{
    if(email){  setIsloading(true);
  auth().sendPasswordResetEmail(email).then((data)=>{
 Snackbar.show({
     text:"Check your email",
     backgroundColor:'green'
 })
 setIsloading(false);
 navigation.navigate('signin')
  }).catch((err)=>{
    Snackbar.show({
        text:err.message,
        backgroundColor:'red'
    })
  })

  setIsloading(false)
}else{
    Snackbar.show({
        text:"Enter email",
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
            
           
           <Form>
                <Item style={styles.item}>
                    <Input
                    placeholder='Email'
                    value={email}
                    style={{}}
                    onChangeText={(t)=>setEmail(t)}
                    />
                </Item>
                
                <Button success style={{marginBottom:10}} block rounded onPress={forgot}>
                    <Text>Send link</Text>
                </Button>
                <Button style={{marginBottom:10}} block rounded onPress={()=>navigation.navigate('signin')}>
                    <Text>SignIn</Text>
                </Button>
                <Button style={{marginBottom:10}} block rounded onPress={()=>navigation.navigate('signup',{screen:'forgot'})}>
                    <Text>Create Account</Text>
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