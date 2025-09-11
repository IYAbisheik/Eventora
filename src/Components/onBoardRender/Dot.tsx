import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

type Props = {
    index: number,
    x: SharedValue<number>
}

const Dot = ({index,x}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index-1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index+1) * SCREEN_WIDTH,
      ],
      [10,20,10],
      Extrapolate.CLAMP
    );
    const opacityAnimation = interpolate(
        x.value,
        [
          (index-1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index+1) * SCREEN_WIDTH,
        ],
        [0.5,1,0.5],
        Extrapolate.CLAMP
      );
    return {
      width: widthAnimation,
      opacity: opacityAnimation
    };
  })

  const animatedColor = useAnimatedStyle(() => {
    const background = interpolateColor(
        x.value,
        [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
        ['#4285F4','#EA4335','#34A853', '#FBBC04']
    );
    return{
        backgroundColor: background
    }
  })

  return <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />
}

export default Dot

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "black",
        marginHorizontal: 8
    } 
})