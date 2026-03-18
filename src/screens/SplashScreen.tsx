import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen = ({ onGetStarted }: SplashScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Stylized minimalist quotation mark logo using interconnected lines (CSS based) */}
        <View style={styles.logo}>
          <View style={styles.logoLine1} />
          <View style={styles.logoLine2} />
        </View>
        <Text style={styles.appName}>Daily Quates</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Clean background
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    position: 'relative',
  },
  logoLine1: {
    position: 'absolute',
    width: 30,
    height: 40,
    borderLeftWidth: 8,
    borderTopWidth: 8,
    borderColor: '#6366F1',
    borderTopLeftRadius: 10,
    left: 10,
    top: 10,
  },
  logoLine2: {
    position: 'absolute',
    width: 30,
    height: 40,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderColor: '#A855F7',
    borderBottomRightRadius: 10,
    right: 10,
    bottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1F2937',
    letterSpacing: 2,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    // Neomorphic design with subtle shadows
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    letterSpacing: 1,
  },
});
