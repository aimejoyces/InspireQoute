import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#7C3AED" />
    <Text style={styles.text}>Finding Inspiration...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#0F172A'
  },
  text: { 
    marginTop: 15, 
    fontSize: 14, 
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
});
