import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuoteCard } from '../common/QuoteCard';
import { SearchControls } from '../common/SearchControls';
import { QuoteItem } from '../../types';

interface MineTabProps {
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

export const MineTab: React.FC<MineTabProps> = ({
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
}) => (
  <ScrollView 
    refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={['#8B735B']} />
    }
  >
    <View style={styles.tabHeader}>
      <View style={styles.tabHeaderRow}>
        <Text style={styles.tabTitle}>My Quotes</Text>
        <TouchableOpacity style={styles.miniFab} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
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
      {quotes.length === 0 && (
        <Text style={styles.noResultsText}>No personal quotes found</Text>
      )}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  tabHeader: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  tabHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B3355',
  },
  miniFab: {
    backgroundColor: '#8B735B',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
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
