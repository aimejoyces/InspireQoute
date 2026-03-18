import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { QuoteCard } from './QuoteCard';
import { Quote } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface QuoteSwiperProps {
  quotes: Quote[];
}

export const QuoteSwiper = ({ quotes: initialQuotes }: QuoteSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quotes, setQuotes] = useState(initialQuotes);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onSwipeComplete = (direction: 'left' | 'right') => {
    // Logic for what happens after swipe (like adding to favorites or just moving to next)
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    translateX.value = 0;
    translateY.value = 0;
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 500 || Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        translateX.value = withSpring(direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH, {
          velocity: event.velocityX,
        }, () => {
            runOnJS(onSwipeComplete)(direction);
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-10, 0, 10],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.9, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.5, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  if (currentIndex >= quotes.length) {
    // Reset or show "No more quotes"
    return null;
  }

  const currentQuote = quotes[currentIndex];
  const nextQuote = quotes[(currentIndex + 1) % quotes.length];

  return (
    <View style={styles.container}>
      {/* Next Card (Bottom) */}
      <Animated.View style={[styles.cardWrapper, nextCardStyle]}>
        <QuoteCard quote={nextQuote.body} author={nextQuote.author} />
      </Animated.View>

      {/* Current Card (Top) */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.cardWrapper, animatedStyle]}>
          <QuoteCard quote={currentQuote.body} author={currentQuote.author} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 500, // Fixed height to prevent layout shifts
  },
  cardWrapper: {
    position: 'absolute',
    width: '100%',
  },
});
