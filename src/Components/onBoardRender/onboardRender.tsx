import { StatusBar, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { onboardingData } from '../../Screens/Onboard/onboard';
import LottieView from 'lottie-react-native';

type Props = {
  item: onboardingData;
  index: number;
  x: SharedValue<number>;
}

const OnboardRender = ({item,index,x}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index-1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index+1) * SCREEN_WIDTH,
      ],
      [200,0,-200],
      Extrapolate.CLAMP
    );
    return {
      transform: [{translateY: translateYAnimation}]
    };
  })

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index-1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index+1) * SCREEN_WIDTH,
      ],
      [1,4,4],
      Extrapolate.CLAMP
    );
    return {
      transform: [{scale: scale}]
    };
  });

  return (
    <View style={[styles.itemContainer,{width: SCREEN_WIDTH}]}>
        <View style={styles.circleContainer}>
          <Animated.View
          style={[{
            width: SCREEN_WIDTH, 
            height: SCREEN_WIDTH, 
            backgroundColor: item.backgroundColor, 
            borderRadius: SCREEN_WIDTH/2
          }, circleAnimation]}/>
        </View>

        <View style={{ height: "12%", justifyContent: "space-between"}}>
          <Text style={[styles.titleText,{color: item.textColor}]}>{item.title}</Text>
          <Text style={[styles.subText]}>{item.text}</Text>
        </View>
        <Animated.View style={lottieAnimationStyle}>
          <LottieView
          source={item.animation}
          style={{width: SCREEN_WIDTH*1, height: SCREEN_WIDTH*0.8}}
          autoPlay
          loop={true}/>
        </Animated.View>
    </View>
  );
}

export default OnboardRender;

const styles = StyleSheet.create({
  itemContainer: {
    height: "80%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",  
    textAlign: "center"  
  },
  subText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  }
})
