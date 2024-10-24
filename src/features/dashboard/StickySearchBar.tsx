import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import {Colors} from '../../utils/Constants';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import SearchBar from '../../components/dashboard/SearchBar';
const StickySearchBar: FC = () => {
  const {scrollY} = useCollapsibleContext(0);
  const animatedShadow = useAnimatedStyle(() => {
    //Automatic Updates: is the main feature that sets it apart from other animation libraries. It allows you to create animations that automatically update based on changes in the UI.
    const opacity = interpolate(scrollY.value, [0, 140], [0, 1]);
    return {opacity};
  });
  const backgroundColorChange = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [1, 80], [0, 1]);
    return {backgroundColor: `rgba(255,255,255,${opacity})`};
  });
  return (
    <StickyView style={[backgroundColorChange]}>
      <SearchBar />
      <Animated.View style={[animatedShadow, styles.shadow]} />
    </StickyView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    height: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
export default StickySearchBar;
