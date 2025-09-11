import { Dimensions, FlatList, StatusBar, StyleSheet, useWindowDimensions, View, ViewToken } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import data, { onboardingData } from './onboard';
import OnboardRender from '../../Components/onBoardRender/onboardRender';
import OnboardPagination from '../../Components/onBoardRender/OnboardPagination';
import OnboardCustomButton from '../../Components/onBoardRender/OnboardCustomButton';
import Svg, { Circle } from 'react-native-svg';


const CIRCLE_LENGTH = 300;
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function OnboardScreen() {
  const [itemIndex, setItemIndex] = useState(0);
  const flatListRef = useAnimatedRef<FlatList<onboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const { width, height } = useWindowDimensions();

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * 0.25,
  }));
  const animatedPropsTwo = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * 0.75,
  }));
  const animatedPropsThree = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * 0.5,
  }));

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
        const index = viewableItems[0].index!;
        setItemIndex(index);
        flatListIndex.value = index;
      }
    },
    []
  );  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => (
          <OnboardRender item={item} index={index} x={x} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.progressWrapper}>
          <Svg
            width={width * 0.30}
            height={width * 0.30}
            viewBox={`0 0 ${width * 0.25} ${width * 0.25}`}
          >
            <Circle
              cx="50%"
              cy="50%"
              r={RADIUS}
              stroke="#4285F4"
              strokeWidth={7}
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={CIRCLE_LENGTH * 1.25}
              fill="transparent"
            />

            {itemIndex >= 1 && (
              <AnimatedCircle
                cx="50%"
                cy="50%"
                r={RADIUS}
                stroke="#EA4335"
                strokeWidth={7}
                strokeDasharray={CIRCLE_LENGTH}
                animatedProps={animatedPropsTwo}
                fill="transparent"
              />
            )}

            {itemIndex >= 2 && (
              <>
               <AnimatedCircle
                cx="50%"
                cy="50%"
                r={RADIUS}
                stroke="#34A853"
                strokeWidth={7}
                strokeDasharray={CIRCLE_LENGTH}
                animatedProps={animatedPropsThree}
                fill="transparent"
              />
              <AnimatedCircle
              cx="50%"
              cy="50%"
              r={RADIUS}
              stroke="#EA4335"
              strokeWidth={7}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedPropsTwo}
              fill="transparent"
            />
             
              </>
            )}

            {itemIndex >= 3 && (
              <>
              <AnimatedCircle
                cx="50%"
                cy="50%"
                r={RADIUS}
                stroke="#FBBC04"
                strokeWidth={7}
                strokeDasharray={CIRCLE_LENGTH}
                animatedProps={animatedProps}
                fill="transparent"
              />
              <AnimatedCircle
                cx="50%"
                cy="50%"
                r={RADIUS}
                stroke="#34A853"
                strokeWidth={7}
                strokeDasharray={CIRCLE_LENGTH}
                animatedProps={animatedPropsThree}
                fill="transparent"
              />
              <AnimatedCircle
              cx="50%"
              cy="50%"
              r={RADIUS}
              stroke="#EA4335"
              strokeWidth={7}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedPropsTwo}
              fill="transparent"
            />
            </>
            )}
          </Svg>
        </View>

        <OnboardCustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
        <OnboardPagination data={data} x={x} />
      </View>
    </View>
  );
}

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressWrapper: {
    position: "absolute",
    bottom: 16
  },
});
