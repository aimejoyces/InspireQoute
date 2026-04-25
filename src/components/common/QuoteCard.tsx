import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { QuoteItem } from '../../types';

const { width } = Dimensions.get('window');

interface QuoteCardProps {
  item: QuoteItem;
  viewType: 'list' | 'grid';
  onToggleFavorite: (id: string) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ item, viewType, onToggleFavorite }) => (
  <View style={[styles.card, viewType === 'grid' && styles.gridCard]}>
    <TouchableOpacity 
      style={styles.favoriteBtn} 
      onPress={() => onToggleFavorite(item.id)}
    >
      <Ionicons 
        name={item.isFavorite ? "heart" : "heart-outline"} 
        size={20} 
        color={item.isFavorite ? "#FF6B6B" : "#D1D1D1"} 
      />
    </TouchableOpacity>
    
    <MaterialCommunityIcons name="format-quote-open" size={20} color="#D1D1D1" style={styles.quoteIconStart} />
    <Text 
      style={[styles.cardQuote, viewType === 'grid' && styles.gridCardQuote]} 
      numberOfLines={viewType === 'grid' ? 4 : undefined}
    >
      {item.body}
    </Text>
    <MaterialCommunityIcons name="format-quote-close" size={20} color="#D1D1D1" style={styles.quoteIconEnd} />
    <Text style={styles.cardAuthor}>— {item.author}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  gridCard: {
    width: (width - 60) / 2,
    height: 180,
    padding: 15,
    marginBottom: 15,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  quoteIconStart: {
    marginBottom: 5,
  },
  quoteIconEnd: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  cardQuote: {
    fontSize: 18,
    color: '#444',
    lineHeight: 26,
    fontFamily: Platform.select({ ios: 'System', android: 'serif' }),
    fontStyle: 'italic',
  },
  gridCardQuote: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardAuthor: {
    fontSize: 14,
    color: '#777',
    textAlign: 'right',
    marginTop: 10,
    fontWeight: '500',
  },
});
