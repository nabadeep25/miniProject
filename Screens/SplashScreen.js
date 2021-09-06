import React from 'react';
import LottieView from 'lottie-react-native'
export default function SplashScreen({navigation,route}) {
  setTimeout(()=>{
    route.params.user?navigation.navigate("Tab",{screen:'notification'}):navigation.navigate('signin');
  },1000)
    console.log(route)
  return (
   
        <LottieView  source={require('../ani.json')} autoPlay loop={false} speed={2} 
         onAnimationFinish={()=>{
            
             route.params.user?navigation.navigate("Tab",{screen:'notification'}):navigation.navigate('signin');
         }} autoSize/>

  );
}
