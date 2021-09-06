import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NotificationScreen from './NotificationScreen';
import TextScreen from './TextScreen';
import PhotoScreen from './PhotoScreen';
import CalculatorScreen from './CalculatorScreen';



const Tab = createBottomTabNavigator();

export default function TabNavigation({navigation,route}) {
 //console.log("her",route.params.user)
  return (
   
      <Tab.Navigator tabBarOptions={{activeTintColor:'#00e676', inactiveTintColor:"#ff6d00",
     
      }}>
        <Tab.Screen name="notification" component={NotificationScreen} 
        options={{tabBarIcon:({color})=>(<Icon name='notifications'color={color} size={28}  />)}}
        />
        <Tab.Screen name="photo" component={PhotoScreen} 
         options={{tabBarIcon:({color})=>(<Icon name='insert-photo'color={color} size={28} />)}}
        />
        <Tab.Screen name="text" component={TextScreen} 
         options={{
           
           tabBarIcon:({color})=>(<Icon name='short-text'color={color} size={28} />)}}
           initialParams={{user:route.params.user}}
        />
        <Tab.Screen name="calculator" component={CalculatorScreen}
         options={{
         
         
           tabBarIcon:({color})=>(<Icon name='calculate'color={color} size={28} />)}}
          />
      </Tab.Navigator>
    
  );
}