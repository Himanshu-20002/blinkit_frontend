import {
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight} from '../../utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import ContentContainer from '@components/dashboard/ContentContainer';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '../../utils/Constants';
import Animated, {
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import withCart from '../cart/WithCart';
import withLiveStatus from '../map/withLiveStatus';
//Initial State: The drawer is closed and hidden from view. This is like the notice being off-screen, represented by the initial value of NOTICE_HEIGHT.
const NOTICE_HEIGHT = -(NoticeHeight + 12); //positions the notice off-screen (above the visible area). This means that when the component first renders, the notice is hidden.

const ProductDashboard = () => {
  const {scrollY,expand}= useCollapsibleContext()
  const previousScrollY=useRef<number>(0)
  const backtoTopStyle=useAnimatedStyle(()=>{
    const isScrollingUp = scrollY.value < previousScrollY.current && scrollY.value > 180
    const opacity = withTiming(isScrollingUp ? 1 : 0,{duration:300})
    const translateY = withTiming(isScrollingUp ? 0 : 10,{duration:300})


    previousScrollY.current=scrollY.value
    return{
      opacity,
      transform:[{translateY}]
    }
  })
  // `noticePosition` is a reference to an animated value created using `useRef` from React. It is initialized with a new instance of `RNAnimated.Value`, which is used to control the vertical position of a notice element in the UI.
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  //noticePosition is a instance of RNAnimated.Value that is used to control the vertical position of a notice element in the UI.

  // `noticePosition` is an animated value that controls the vertical position of a notice (like a notification or alert) on the screen. It is initialized to a value that positions the notice off-screen (above the visible area).
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 3900,
      useNativeDriver: false,
    }).start();
  };
  // `slideDown` is a function that animates the `noticePosition` value to `0`, which is the top of the screen. This causes the notice to slide down into view.
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeout = setTimeout(() => {
      slideUp();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  console.log('im product dashboard');
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <Animated.View style={[styles.backToTop,backtoTopStyle]}>
          <TouchableOpacity
          onPress={()=>{
            scrollY.value=0
            expand()
          }}
          style={{flexDirection:'row',alignItems:'center',gap:6,zIndex:999}}>
            <Icon name="arrow-up-circle" size={RFValue(12)} color="white" />
            <CustomText variant="h9" fontFamily={Fonts.SemiBold} style={{color:'white'}}>Back to top</CustomText>
          </TouchableOpacity>
        </Animated.View>
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <ContentContainer />

            <View style={{backgroundColor: '#F8F8F8', padding: 20}}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                India's last minute app 🥭
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{marginTop: 10, paddingBottom: 100, opacity: 0.2}}>
                Developed with ❤️ By himanshu
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};
const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTop:{
    position:'absolute',
    bottom:20,
    right:20,
    backgroundColor:'#000',
    padding:10,
    borderRadius:100
    ,alignSelf:"center",
    gap:4,
    zIndex:999
  }
});
export default withLiveStatus(withCart(withCollapsibleContext(ProductDashboard)));
//By wrapping ProductDashboard with withCollapsibleContext, you enable it to access the collapsible context, which can be useful for managing UI elements that depend on the scroll position or other collapsible states. This allows for a more dynamic and responsive user interface.

//The primary purpose of withCollapsibleContext is to provide the wrapped component (in this case, ProductDashboard) with access to the collapsible context. This context includes shared state and methods related to the collapsible behavior, such as the current scroll position.
