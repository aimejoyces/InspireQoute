import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  searchFilter: 'all' | 'body' | 'author';
  onFilterChange: (filter: 'all' | 'body' | 'author') => void;
  isFilterMenuVisible: boolean;
  onToggleFilterMenu: () => void;
  viewType: 'list' | 'grid';
  onViewTypeChange: (type: 'list' | 'grid') => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchQuery,
  onSearchChange,
  searchFilter,
  onFilterChange,
  isFilterMenuVisible,
  onToggleFilterMenu,
  viewType,
  onViewTypeChange,
  isLoading,
  placeholder,
}) => (
  <View style={styles.controlsContainer}>
    <View style={styles.searchBar}>
      <TouchableOpacity 
        style={styles.filterSelector}
        onPress={onToggleFilterMenu}
      >
        <Text style={styles.filterLabel}>
          {searchFilter === 'all' ? 'All' : searchFilter === 'body' ? 'Quotes' : 'Author'}
        </Text>
        <Ionicons name="chevron-down" size={14} color="#8B735B" />
      </TouchableOpacity>
      
      <TextInput 
        style={styles.searchInput} 
        placeholder={placeholder || "Search..."} 
        value={searchQuery} 
        onChangeText={onSearchChange} 
        placeholderTextColor="#999" 
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearBtn}>
          <Ionicons name="close-circle" size={18} color="#CCC" />
        </TouchableOpacity>
      )}
      {isLoading ? (
        <ActivityIndicator size="small" color="#8B735B" style={styles.searchIcon} />
      ) : (
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
      )}
    </View>
    
    {isFilterMenuVisible && (
      <View style={styles.filterMenu}>
        {(['all', 'body', 'author'] as const).map((filter) => (
          <TouchableOpacity 
            key={filter}
            style={[styles.filterOption, searchFilter === filter && styles.filterOptionActive]}
            onPress={() => onFilterChange(filter)}
          >
            <Text style={[styles.filterOptionText, searchFilter === filter && styles.filterOptionTextActive]}>
              {filter === 'all' ? 'All' : filter === 'body' ? 'Quotes' : 'Author'}
            </Text>
            {searchFilter === filter && (
              <Ionicons name="checkmark" size={16} color="#8B735B" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    )}

    <View style={styles.viewToggles}>
      <TouchableOpacity onPress={() => onViewTypeChange('grid')} style={styles.toggleBtn}>
        <Ionicons name="grid-outline" size={22} color={viewType === 'grid' ? '#8B735B' : '#CCC'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onViewTypeChange('list')} style={styles.toggleBtn}>
        <Ionicons name="list" size={24} color={viewType === 'list' ? '#8B735B' : '#CCC'} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 100,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 50,
  },
  filterSelector: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 13,
    color: '#8B735B',
    fontWeight: 'bold',
    marginRight: 4,
  },
  filterMenu: {
    position: 'absolute',
    top: 55,
    left: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 5,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 1000,
    width: 130,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterOptionActive: {
    backgroundColor: '#FDF5E6',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  filterOptionTextActive: {
    color: '#8B735B',
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  clearBtn: {
    padding: 5,
  },
  searchIcon: {
    marginLeft: 5,
  },
  viewToggles: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
  },
  toggleBtn: {
    padding: 5,
    marginLeft: 5,
  },
});
