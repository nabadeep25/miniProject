

import React,{useState,useEffect} from 'react';

import {
  
  StyleSheet,

} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './Screens/TabNavigation';

import auth from '@react-native-firebase/auth'

import SignUp from './Screens/SignUp';
import SplashScreen from './Screens/SplashScreen';

import SignIn from './Screens/SignIn'
import Forgot from './Screens/Forgot'





const Stack=createStackNavigator();

const App = () => {
    
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
   
   
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; 
    }, []);
  
    if (initializing) return null;
  
    

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName='splash'>
       
         <Stack.Screen name='signin' component={SignIn} />
       <Stack.Screen name='Tab' component={TabNavigation} initialParams={{user}}/>
        <Stack.Screen name="forgot" component={Forgot} />
        <Stack.Screen name="signup" component={SignUp} />
       <Stack.Screen name='splash' options={{title:''}} component={SplashScreen} initialParams={{user:user}} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
