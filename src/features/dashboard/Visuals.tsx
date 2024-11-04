import {adData, productsList} from '../../utils/dummyData';
import {Dimensions, TouchableOpacity} from 'react-native';
import {View, StyleSheet, Image, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import React, {FC} from 'react';
// import {screenHeight, screenWidth} from '../../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors, Fonts} from '../../utils/Constants';
import LottieView from 'lottie-react-native';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import Video from 'react-native-video';
import {BlurView} from '@react-native-community/blur';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CustomText from '@components/ui/CustomText';
import AdCarousal from '@components/dashboard/AdCarousal';



//implementation of on Refresh Visuals changes including change in all theme and 1 dark mode and loading animation
// Theme 1: Light Mode
// Theme 2: Dark Mode
// Theme 3: Dark Mode with loading animation
// Theme 4: raining weather thunderstorm  bushesh flying appart city scene close up  emotion quick action button animation in case of animation slider  , boy running forom cycles to delive the product rainy weather thunder storm rain cote trafic light police chase
// implement a cirle  indian rath circle aswasthama rath circle for offer product loading animation
// implementation of haptic feedback in tuch vibrations and sound in placing and order and adding to cart  and payment  sound effect of money and sound effect of success and sound effect of error
// Theme 3: Loading Animation



const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type VisualsProps = {
  type: string;
};



const Visuals: FC<VisualsProps> = ({type}) => {
  //When you call const { scrollY } = useCollapsibleContext(); in your Visuals.tsx file, you are destructuring the context object to get the scrollY animated value. This value represents the current vertical scroll position and is updated as the user scrolls.
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {
      opacity,
    };
  });
  const animationSource = () => {
    switch (type) {
      case 'home':
        return require('../../assets/animations/raining.json');
      //deliveryGuy
      case 'saved':
        return require('../../assets/animations/expAnimation/themeButton.json');
      case 'food':
        return require('../../assets/animations/expAnimation/1.json');
      case 'tryIt':
        return require('../../assets/animations/expAnimation/deadlightshock.json');
      //3,wire
      case 'games':
        return require('../../assets/animations/expAnimation/game.json');
      default:
        return require('../../assets/animations/expAnimation/1.json');
    }
  };
  // Function to determine dynamic styles based on type
  const dynamicStyles = ():{lottieContainer:ViewStyle,lottie:ViewStyle} => {
    switch (type) {
      case 'home':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'darkorange', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 150,
            position: 'absolute',
            transform: [{scaleX: -1}],
            // width: '100%',
            // height: 500,
            // position: 'absolute',
            // transform: [{scaleX: -1}],
            // top:9,
            // left:7,
            // right:5,
            // bottom:5,
          },
        };
      case 'saved':
        return {
          lottieContainer: {
            borderRadius: 0,
            backgroundColor: 'pink',
            // opacity:0.5, // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: 400,
            height: 460,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 16,
            left: 7,
            right: 5,
            bottom: 5,
          },
        };
      case 'food':
        return {
          lottieContainer: {
            borderRadius: 0,
            backgroundColor: 'orangered', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 500,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 9,
            left: 7,
            right: 5,
            bottom: 5,
          },
        };
      case 'tryIt':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'cadetblue', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 500,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 9,
            left: 7,
            right: 5,
            bottom: 5,
          },
        };
      case 'games':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'black', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: -11,
            left: -22,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: 450,
            height: 450,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            opacity:-6
          },
        };
      default:
        return {
          container: {backgroundColor: 'red'},
          lottie: {height: 150},
        };
    }
  };

  const DynamicStyles = dynamicStyles();

  const renderItem = ({item,index}:any) =>{
    return (
        <View style={styles.featuredProductContainer}>
          <View style={styles.featuredProductTextContainer}>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
              Featured
            </CustomText>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
              {item.name}
            </CustomText>
          </View>
          <Image
            source={{uri: item.image}}
            style={styles.productImage}
          />
        </View>
    );
  }

  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <Image
        source={require('../../assets/images/cloud.png')}
        style={styles.cloud}
      />
      {type === 'tryIt' && (
        <Video
          source={require('../../assets/video/PurpleStar.mp4')}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          muted={true} // Mute the video if you don't want sound
        />
      )}
      {type === 'games' && (
        <View style={styles.videoContainer}>
          <Video
            source={require('../../assets/video/dancing.mp4')}
            style={styles.video}
            resizeMode='cover'
            repeat={true}
            muted={true} // Mute the video if you don't want sound
          />
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light" // You can choose 'light', 'dark', or 'xlight'
            blurAmount={100} // Adjust the blur intensity
          />
        </View>
      )}
      {/* {type === 'saved' && (
        <View style={styles.videoContainer}>
          <Video
            source={require('../../assets/video/road.mp4')}
            style={styles.video}
            resizeMode="cover"
            repeat={true}
            muted={true} // Mute the video if you don't want sound
          />
        </View>
      )} */}
      <View style={DynamicStyles.lottieContainer}>
        <View style={styles.lottieWrapper}>
          <LottieView
            autoPlay={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            loop={true}
            source={animationSource()}
            style={[DynamicStyles.lottie as ViewStyle]} // Adjust height as needed
          />
          {type === 'games' && (
            <LinearGradient
              colors={['transparent', 'rgba(16 37 96 / 0.8)', 'fuchsia']} // Adjust colors for fade effect
              style={styles.lottieBottomFade}
            />
          )}
          {type === 'saved' && (
            <TouchableOpacity
            style={[styles.touchableContainer, { borderWidth: 1, borderColor: 'red' }]}
            onPress={() => {
              console.log('pressed');
            }}
            activeOpacity={0.7}
            >
         
              <FlatList
                data={productsList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                // removeClippedSubviews={false}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
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
  touchableContentContainer: {
   
  },
  touchableContainer: {
    width:'90%',
    height: 100,
    zIndex: 1000,
    backgroundColor: 'orangered',
    borderRadius: 9,
    overflow: 'hidden',
    position: 'absolute',
    top: 350,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 100,
    
  },
  featuredProductTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems:'flex-start',
    gap: 20,
    marginLeft: 10,
    marginTop: -30,
  },
  featuredProductContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'limegreen',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  lottieWrapper: {
    position: 'relative',
    width: 450, // Use screen width for responsiveness
    height: 460, // Adjust height as needed for responsiveness
    overflow: 'hidden', // Ensure the gradient is clipped to the Lottie animation
  },
  lottieBottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90, // Small height for a subtle border fade
  },
  bottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 10, // Small height for a subtle border fade
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',

  },
  // lottieContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   overflow: 'hidden', // Ensure corners are clipped
  //   // backgroundColor:'pink'
  // },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Ensure the video is behind other content
    // opacity:0.01,
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
