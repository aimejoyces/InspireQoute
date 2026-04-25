import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform, ScrollView, RefreshControl } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { QuoteCard } from '../common/QuoteCard';
import { SearchControls } from '../common/SearchControls';
import { QuoteItem } from '../../types';

const { width } = Dimensions.get('window');

interface HomeTabProps {
  quotes: QuoteItem[];
  isLoading: boolean;
  onRefresh: () => void;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  searchFilter: 'all' | 'body' | 'author';
  onFilterChange: (filter: 'all' | 'body' | 'author') => void;
  isFilterMenuVisible: boolean;
  onToggleFilterMenu: () => void;
  viewType: 'list' | 'grid';
  onViewTypeChange: (type: 'list' | 'grid') => void;
  onToggleFavorite: (id: string) => void;
  onAddPress: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  quotes,
  isLoading,
  onRefresh,
  searchQuery,
  onSearchChange,
  searchFilter,
  onFilterChange,
  isFilterMenuVisible,
  onToggleFilterMenu,
  viewType,
  onViewTypeChange,
  onToggleFavorite,
  onAddPress,
}) => {
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={['#8B735B']} />
      }
    >
      <View style={styles.heroContainer}>
        <View style={styles.heroContent}>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
          <Text style={styles.affirmationText}>Today, I'm grateful for the sunshine.</Text>
        </View>
        <View style={styles.svgContainer}>
          <Svg height="60" width={width} viewBox={`0 0 ${width} 60`} preserveAspectRatio="none">
            <Path d={`M0 0 Q${width / 2} 60 ${width} 0 V0 H0 Z`} fill="#FDF5E6" />
          </Svg>
        </View>
        <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={onAddPress}>
          <Ionicons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <SearchControls
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchFilter={searchFilter}
        onFilterChange={onFilterChange}
        isFilterMenuVisible={isFilterMenuVisible}
        onToggleFilterMenu={onToggleFilterMenu}
        viewType={viewType}
        onViewTypeChange={onViewTypeChange}
        isLoading={isLoading}
        placeholder={`Search ${searchFilter === 'all' ? 'everything' : searchFilter === 'body' ? 'quotes' : 'authors'}...`}
      />

      <View style={styles.listContainer}>
        {viewType === 'list' ? (
          quotes.map((item) => (
            <QuoteCard key={item.id} item={item} viewType={viewType} onToggleFavorite={onToggleFavorite} />
          ))
        ) : (
          <View style={styles.gridContainer}>
            {quotes.map((item) => (
              <QuoteCard key={item.id} item={item} viewType={viewType} onToggleFavorite={onToggleFavorite} />
            ))}
          </View>
        )}
        {quotes.length === 0 && !isLoading && (
          <Text style={styles.noResultsText}>No quotes found</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    backgroundColor: '#FDF5E6',
    width: '100%',
    paddingTop: 40,
    position: 'relative',
    marginBottom: 40,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  dateText: {
    fontSize: 14,
    color: '#998E7E',
    marginBottom: 20,
  },
  affirmationText: {
    fontSize: 28,
    color: '#3B3355',
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: Platform.select({ ios: 'Playfair Display', android: 'serif' }),
  },
  svgContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#8B735B',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 60,
    fontSize: 16,
  },
});
