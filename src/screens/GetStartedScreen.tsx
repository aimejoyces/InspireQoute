import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface GetStartedScreenProps {
  onContinue: () => void;
}

const Balloon = ({ size = 100, color = "#FFB6C1", style = {} }) => (
  <View style={style}>
    <Svg width={size} height={size * 1.3} viewBox="0 0 100 130">
      <G>
        {/* Balloon body */}
        <Path 
          d="M50 10 C25 10 5 30 5 55 C5 80 25 100 50 110 C75 100 95 80 95 55 C95 30 75 100 50 10" 
          fill={color} 
          opacity={0.8}
        />
        <Path 
          d="M50 10 C30 10 15 25 15 50 C15 75 35 100 50 110 C65 100 85 75 85 50 C85 25 70 10 50 10" 
          fill={color} 
          opacity={0.6}
        />
        {/* Balloon patterns */}
        <Path d="M50 10 L50 110" stroke="#FFF" strokeWidth="1" opacity={0.3} />
        
        {/* Basket strings */}
        <Path d="M35 110 L40 125" stroke="#8B4513" strokeWidth="1" />
        <Path d="M65 110 L60 125" stroke="#8B4513" strokeWidth="1" />
        
        {/* Basket */}
        <Path 
          d="M40 125 H60 L58 135 H42 Z" 
          fill="#8B4513" 
        />
      </G>
    </Svg>
  </View>
);

const FlowerDecoration = () => (
  <View style={styles.flowerContainer}>
    <Svg width="150" height="150" viewBox="0 0 100 100">
      <G opacity={0.15}>
        <Path 
          d="M50 50 Q60 20 50 10 Q40 20 50 50" 
          fill="none" 
          stroke="#3B3355" 
          strokeWidth="0.5" 
        />
        <Path 
          d="M50 50 Q80 40 90 50 Q80 60 50 50" 
          fill="none" 
          stroke="#3B3355" 
          strokeWidth="0.5" 
        />
        <Path 
          d="M50 50 Q60 80 50 90 Q40 80 50 50" 
          fill="none" 
          stroke="#3B3355" 
          strokeWidth="0.5" 
        />
        <Path 
          d="M50 50 Q20 60 10 50 Q20 40 50 50" 
          fill="none" 
          stroke="#3B3355" 
          strokeWidth="0.5" 
        />
        <Path 
          d="M50 50 Q75 25 80 15 Q70 20 50 50" 
          fill="none" 
          stroke="#3B3355" 
          strokeWidth="0.5" 
        />
        <Circle cx="50" cy="50" r="2" fill="#3B3355" />
      </G>
    </Svg>
  </View>
);

export const GetStartedScreen = ({ onContinue }: GetStartedScreenProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E6E6FA', '#FFF0F5', '#F5FFFA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      
      <SafeAreaView style={styles.content}>
        {/* Hero Illustration */}
        <View style={styles.illustrationContainer}>
          <Balloon 
            size={120} 
            color="#FFD1DC" 
            style={{ position: 'absolute', top: 20, left: width * 0.1 }} 
          />
          <Balloon 
            size={160} 
            color="#B2E2F2" 
            style={{ position: 'relative', zIndex: 10 }} 
          />
          <Balloon 
            size={100} 
            color="#FFFACD" 
            style={{ position: 'absolute', top: 50, right: width * 0.1 }} 
          />
        </View>

        {/* Typography */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Fuel Your Day with Positivity</Text>
          <Text style={styles.subheading}>
            Brighten your day with positive thoughts and energy.
          </Text>
        </View>

        {/* Primary Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={onContinue}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlowerDecoration />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  illustrationContainer: {
    height: height * 0.35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -20,
  },
  heading: {
    fontSize: 34,
    color: '#3B3355',
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'Playfair Display', android: 'serif' }),
    fontWeight: '600',
    lineHeight: 42,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    color: '#6B6B8B',
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'Poppins', android: 'sans-serif' }),
    fontWeight: '400',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  footer: {
    width: '100%',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#3B3355',
    width: '100%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B3355',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  flowerContainer: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    zIndex: -1,
  },
});
