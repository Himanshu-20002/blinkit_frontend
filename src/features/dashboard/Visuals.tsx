import {View, Text, StyleSheet, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import React, {FC} from 'react';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors} from '../../utils/Constants';
import LottieView from 'lottie-react-native';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';


//implementation of on Refresh Visuals changes including change in all theme and 1 dark mode and loading animation 
// Theme 1: Light Mode
// Theme 2: Dark Mode
// Theme 3: Dark Mode with loading animation
// Theme 4: raining weather thunderstorm  bushesh flying appart city scene close up  emotion quick action button animation in case of animation slider  , boy running forom cycles to delive the product rainy weather thunder storm rain cote trafic light police chase  
// implement a cirle  indian rath circle aswasthama rath circle for offer product loading animation 
// implementation of haptic feedback in tuch vibrations and sound in placing and order and adding to cart  and payment  sound effect of money and sound effect of success and sound effect of error 

// Theme 3: Loading Animation

const Visuals: FC = () => { 
  //When you call const { scrollY } = useCollapsibleContext(); in your Visuals.tsx file, you are destructuring the context object to get the scrollY animated value. This value represents the current vertical scroll position and is updated as the user scrolls.
  const {scrollY} = useCollapsibleContext()
  const headerAnimatedStyle= useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value,[0,120],[1,0])
    return {
      opacity
    }
  })


  return (
    <Animated.View style={[styles.container,headerAnimatedStyle]}>
      
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <Image
        source={require('../../assets/images/cloud.png')}
        style={styles.cloud}
      />
      <LottieView
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        source={require('../../assets/animations/raining.json')}
        style={styles.lottie}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ghost: {
    width: '70%',
    height: 70,
    position: 'absolute',
    transform: [{scaleX: -1}],
  },
  lottie: {
    width: '100%',
    height: 150,
    position: 'absolute',
    transform: [{scaleX: -1}],
  },
  gradient: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'absolute',
  },
  cloud: {
    width: screenWidth,
    height: 100,
    resizeMode: 'stretch',
  },
});

export default Visuals;
