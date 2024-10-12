import { View, StyleSheet, Alert } from 'react-native';
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { Colors } from '../../utils/Constants'
import logo from '@assets/images/splash_logo.jpeg';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests:false,
  authorizationLevel:'always',
  enableBackgroundLocationUpdates:true,
  locationProvider:'auto'
})



const SplashScreen = () => {
  useEffect(()=>{
    const fetchUserLocation = async () => {
      try {
      Geolocation.requestAuthorization();
      } catch (error) {
          Alert.alert('Error','Sorry, we could not get your location')
      }
    }
    const timeoutId = setTimeout(fetchUserLocation,1000);
    return () => clearTimeout(timeoutId);
  },[])
  return (
    <View style={styles.container} >
      <Image source={logo} style={styles.logo}/>
     </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.primary,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  logo:{
    width:screenWidth*0.7,
    height:screenHeight*0.7,
    resizeMode:'contain'
  }
})  

export default SplashScreen