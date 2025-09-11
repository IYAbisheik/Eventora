import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { onboardingData } from '../../Screens/Onboard/onboard'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Svg, Circle } from 'react-native-svg';

type Props = {
    dataLength: number,
    flatListRef: AnimatedRef<FlatList<onboardingData>>;
    flatListIndex: SharedValue<number>,
    x: SharedValue<number>
}

const CIRCLE_LENGTH = 1000;

const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const OnboardCustomButton = ({dataLength, flatListIndex, flatListRef, x} : Props) => {

    const {width: SCREEN_WIDTH} = useWindowDimensions();

    const{width, height} = Dimensions.get('window');
    const navigation = useNavigation();

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return{
            width:
                flatListIndex.value === dataLength - 1 ?
                withSpring(60) : withSpring(60),
            height: 60,
        };
    })

    const animatedColor = useAnimatedStyle(() => {
        const background = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
            ['#D2E3FC','#FAD2CF','#CEEAD6','#FEEFC3']
        );
        return{
            backgroundColor: background
        }
      })

  return (
    <TouchableOpacity onPress={() => {
        if(flatListIndex.value < dataLength - 1){
            flatListRef.current?.scrollToIndex({index: flatListIndex.value + 1})
        } else{
            navigation.navigate("WelcomeScreen")
        }
    }} style={{ justifyContent: "center", alignItems: "center"}}> 
        
        <Animated.View style={[styles.container, animatedColor]}>
            <Animated.Image source={require("../../../Assets/right_arrow.png")} style={[styles.arrow]} />
        </Animated.View>
    </TouchableOpacity>
  )
}

export default OnboardCustomButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        paddingHorizontal: 40,
        paddingVertical: 40
    },
    arrow: {
        position: "absolute",
        width:25,
        height: 25
    },
    getStartText: {
        position: "absolute",
        color: "white",
        fontSize: 16
    }
})