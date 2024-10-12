import { View, StyleSheet } from 'react-native';
import React from 'react'
import { Image } from 'react-native'
import { Colors } from '../../utils/Constants'
import logo from '@assets/images/splash_logo.jpeg';
import { screenHeight, screenWidth } from '../../utils/Scaling';

const SplashScreen = () => {
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