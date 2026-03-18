import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface QuoteCardProps {
  quote: string;
  author: string;
}

export const QuoteCard = ({ quote, author }: QuoteCardProps) => (
  <View style={styles.cardContainer}>
    {/* Card with Gradient-like Overlay Effect */}
    <View style={styles.card}>
      {/* Background simulation (using a solid color that represents the deep navy/gradient base) */}
      <View style={[StyleSheet.absoluteFill, styles.gradientOverlay]} />
      
      {/* Top Left Quote Icon */}
      <MaterialCommunityIcons 
        name="format-quote-open" 
        size={40} 
        color="rgba(255, 255, 255, 0.4)" 
        style={styles.quoteIcon} 
      />

      <View style={styles.content}>
        <Text style={styles.quoteText}>{quote}</Text>
        <Text style={styles.authorText}>— {author}</Text>
      </View>

      {/* Floating Like Button at Bottom Right of Card */}
      <TouchableOpacity style={styles.likeButton} activeOpacity={0.8}>
        <MaterialCommunityIcons name="heart" size={20} color="#FF69B4" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 450,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    // Premium Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
  },
  gradientOverlay: {
    backgroundColor: 'rgba(124, 58, 237, 0.6)', // Deep Purple base
    // Note: In a real app, we'd use Expo LinearGradient here for the purple-to-blue transition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quoteIcon: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  quoteText: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 28,
    lineHeight: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '300',
  },
  authorText: {
    marginTop: 20,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  likeButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glass effect
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
