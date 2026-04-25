import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface DictionaryTabProps {
  dictSearch: string;
  onDictSearchChange: (text: string) => void;
  onSearchPress: () => void;
  dictResult: { word: string; definition: string } | null;
  onLogout: () => void;
}

export const DictionaryTab: React.FC<DictionaryTabProps> = ({
  dictSearch,
  onDictSearchChange,
  onSearchPress,
  dictResult,
  onLogout,
}) => (
  <View style={styles.dictionaryContainer}>
    <View style={styles.header}>
      <Text style={styles.tabTitle}>Dictionary</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#3B3355" />
      </TouchableOpacity>
    </View>
    <View style={[styles.searchBar, { marginTop: 20 }]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Look up a word..."
        value={dictSearch}
        onChangeText={onDictSearchChange}
        onSubmitEditing={onSearchPress}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={onSearchPress}>
        <Ionicons name="search" size={20} color="#8B735B" style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
    
    {dictResult ? (
      <View style={styles.resultCard}>
        <Text style={styles.resultWord}>{dictResult.word}</Text>
        <Text style={styles.resultDef}>{dictResult.definition}</Text>
      </View>
    ) : (
      <View style={styles.emptyDict}>
        <Ionicons name="book-outline" size={80} color="#F2F2F2" />
        <Text style={styles.emptyText}>Discover the meaning of words in Qoutes</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  dictionaryContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B3355',
  },
  logoutButton: {
    padding: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  resultCard: {
    marginTop: 30,
    backgroundColor: '#FDF5E6',
    borderRadius: 20,
    padding: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#8B735B',
  },
  resultWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B3355',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  resultDef: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  emptyDict: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 20,
    color: '#CCC',
    fontSize: 16,
    textAlign: 'center',
  },
});
