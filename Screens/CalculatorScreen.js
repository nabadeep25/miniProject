
import { Form, Input ,Button,Item, Spinner} from 'native-base';
import React, { useState } from 'react';
import { Text, View ,StyleSheet, ToastAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import Snackbar from 'react-native-snackbar';
export default function CalculatorScreen() {
  const [number1, setnumber1] = useState('');
  const [number2, setnumber2] = useState('');
  const [operator, setoperator] = useState('');
  const [result,setResult]=useState('');
  const [isloading, setisloading] = useState(false)

  const calculate=async()=>{
    if(number1 && number2 && operator){
      setisloading(true)
     await fetch('https://calculate-api.herokuapp.com/c/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          n1:parseInt(number1),
         n2:parseInt(number2),
         operator:operator
        })
      }).then((res)=>res.json())
      .then((r)=>{
       // console.log(r.res)
        setResult(r.res)
        setisloading(false)
      })
      .catch(err=>{
        console.log(err)
        setisloading(false)
        ToastAndroid.show("Error occured ",ToastAndroid.SHORT);
      })
      
      
    }
    else{
     
      Snackbar.show({
        text:"Plese Select all fields",
        backgroundColor:'red'
      })
    }
  }
  if(isloading){
    return(<View style={{flex:1,justifyContent:'center'}}><Spinner color="green"/>
    <Text style={{alignSelf:'center'}}>Fetching result..</Text>
    </View>)
  }
  return (
    <View style={{ flex: 1, backgroundColor:'#f1a9a0'  }}>
    
      <Form style={{flex:1,alignContent:'center',justifyContent:'center'}}>
        
          <Item style={styles.label}>
          <Text style={{fontSize:20}}>Result: {result}</Text>
        
          </Item>
     
                
               <Item style={styles.item} >
                 
               <Input value={number1} onChangeText={(t)=>{setnumber1(t)}} placeholder="Number 1" keyboardType='number-pad'  />
               </Item>
               <Item style={styles.item} >  
               <Input  value={number2} onChangeText={(t)=>{setnumber2(t)}} placeholder="Number 2" keyboardType='number-pad'   />
               </Item>
              
                   
                   <Picker 
                   onValueChange={(value,index)=>setoperator(value) }  
                   >
                   <Picker.Item  label="Select operator" value="" />
                 <Picker.Item label="+ Add" value="+" />
                 <Picker.Item label="- Subtract" value="-"/>
                 <Picker.Item label="* Multiply" value="*" />
               
                   </Picker>
                   
                
              
                 <Button block rounded style={styles.item,{backgroundColor:'#00D84A'}} onPress={calculate}>
                     <Text>Calculate</Text>
                 </Button>
             </Form>
  </View>
  );
}
const styles=StyleSheet.create({
    
  label:{
    
     justifyContent:'center',
     fontSize:26
  },item:{
      backgroundColor:'white',
      margin:10,
      borderRadius:10
  }
   
  })