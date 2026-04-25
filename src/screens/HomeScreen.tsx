import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { fetchQuotes } from '../services/favqsApi';
import { fetchWordDefinition } from '../services/dictionaryApi';
import { 
  initDatabase, 
  saveFavorite, 
  removeFavorite, 
  getFavorites,
  cacheApiQuotes,
  getCachedApiQuotes
} from '../services/database';
import { QuoteItem } from '../types';

// Tab Components
import { HomeTab } from '../components/tabs/HomeTab';
import { SavedTab } from '../components/tabs/SavedTab';
import { MineTab } from '../components/tabs/MineTab';
import { DictionaryTab } from '../components/tabs/DictionaryTab';

// Common Components
import { AddQuoteModal } from '../components/common/AddQuoteModal';

const INITIAL_QUOTES: QuoteItem[] = [
  {
    id: '1',
    body: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
    author: 'Albert Einstein',
    isFavorite: false,
    isUserAdded: false
  },
  {
    id: '2',
    body: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    isFavorite: false,
    isUserAdded: false
  }
];

export const HomeScreen = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'favorites' | 'my-quotes' | 'dictionary'>('home');
  const [quotes, setQuotes] = useState<QuoteItem[]>(INITIAL_QUOTES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Tab-specific state
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({
    home: '',
    favorites: '',
    'my-quotes': ''
  });

  const [searchFilters, setSearchFilters] = useState<{ [key: string]: 'all' | 'body' | 'author' }>({
    home: 'all',
    favorites: 'all',
    'my-quotes': 'all'
  });

  const [viewTypes, setViewTypes] = useState<{ [key: string]: 'list' | 'grid' }>({
    home: 'list',
    favorites: 'list',
    'my-quotes': 'list'
  });

  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [dictSearch, setDictSearch] = useState('');
  const [dictResult, setDictResult] = useState<{ word: string; definition: string } | null>(null);

  const currentSearchQuery = searchQueries[activeTab] || '';
  const currentSearchFilter = searchFilters[activeTab] || 'all';
  const currentViewType = viewTypes[activeTab] || 'list';

  const loadQuotes = async (query?: string, filterType: 'all' | 'body' | 'author' = 'all', isRefreshing = false) => {
    if (!isRefreshing) setIsLoading(true);
    setError(null);
    try {
      await initDatabase();

      const [dbFavs, cachedApi] = await Promise.all([
        getFavorites(),
        getCachedApiQuotes()
      ]);
      
      const favIds = new Set(dbFavs.map(f => f.id));

      if (cachedApi.length > 0 && !query) {
        setQuotes(prev => {
          const userQuotes = prev.filter(q => q.isUserAdded);
          return [...userQuotes, ...cachedApi.map(q => ({ ...q, isFavorite: favIds.has(q.id) }))];
        });
      }

      const apiResponse = await fetchQuotes(query, filterType);
      const validApiQuotes = (apiResponse.quotes || []).filter(q => q && q.body && q.author);
      
      const apiQuotes: QuoteItem[] = validApiQuotes.map(q => ({
        id: q.id.toString(),
        body: q.body,
        author: q.author,
        isFavorite: favIds.has(q.id.toString()),
        isUserAdded: false
      }));
      
      if (!query && apiQuotes.length > 0) {
        await cacheApiQuotes(apiQuotes);
      }

      setQuotes(prev => {
        const userQuotes = prev.filter(q => q.isUserAdded);
        const merged = [...userQuotes, ...apiQuotes];
        
        INITIAL_QUOTES.forEach(iq => {
          if (!merged.some(m => m.id === iq.id)) {
            merged.push({ ...iq, isFavorite: favIds.has(iq.id) });
          }
        });

        dbFavs.forEach(fv => {
          if (!merged.some(m => m.id === fv.id)) {
            merged.push(fv);
          }
        });

        return merged;
      });
    } catch (err) {
      console.log("App load error:", err);
      setError("Working in offline mode.");
      try {
        const [f, c] = await Promise.all([getFavorites(), getCachedApiQuotes()]);
        const favIds = new Set(f.map(fav => fav.id));
        const combined = [...c, ...INITIAL_QUOTES, ...f];
        const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
        setQuotes(prev => {
           const userQuotes = prev.filter(q => q.isUserAdded);
           return [...userQuotes, ...unique.map(q => ({ ...q, isFavorite: favIds.has(q.id) }))];
        });
      } catch (e) {
        setQuotes(INITIAL_QUOTES);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    loadQuotes(undefined, 'all', true);
  };

  useEffect(() => { 
    loadQuotes();
  }, []);

  useEffect(() => {
    if (activeTab === 'home') {
      if (currentSearchQuery.trim().length > 2) {
        const delayDebounceFn = setTimeout(() => {
          loadQuotes(currentSearchQuery, currentSearchFilter);
        }, 500);
        return () => clearTimeout(delayDebounceFn);
      } else if (currentSearchQuery.trim().length === 0) {
        loadQuotes(undefined, currentSearchFilter);
      }
    }
  }, [currentSearchQuery, activeTab, currentSearchFilter]);

  const filteredQuotes = useMemo(() => {
    let baseQuotes = quotes;
    if (activeTab === 'favorites') baseQuotes = quotes.filter(q => q.isFavorite);
    else if (activeTab === 'my-quotes') baseQuotes = quotes.filter(q => q.isUserAdded);
    else if (activeTab === 'home') baseQuotes = quotes.filter(q => !q.isUserAdded);

    if (currentSearchQuery.trim() === "") return baseQuotes;

    return baseQuotes.filter(q => {
      const bodyMatch = (q.body || "").toLowerCase().includes(currentSearchQuery.toLowerCase());
      const authorMatch = (q.author || "").toLowerCase().includes(currentSearchQuery.toLowerCase());
      
      if (currentSearchFilter === 'author') return authorMatch;
      if (currentSearchFilter === 'body') return bodyMatch;
      return bodyMatch || authorMatch;
    });
  }, [quotes, currentSearchQuery, activeTab, currentSearchFilter]);

  const handleToggleFavorite = async (id: string) => {
    const quote = quotes.find(q => q.id === id);
    if (!quote) return;

    const newFavoriteStatus = !quote.isFavorite;
    
    try {
      if (newFavoriteStatus) {
        await saveFavorite({ ...quote, isFavorite: true });
      } else {
        await removeFavorite(id);
      }
      
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, isFavorite: newFavoriteStatus } : q));
    } catch (err) {
      console.error("Failed to update favorite in DB", err);
    }
  };

  const handleAddQuote = () => {
    if (newQuote.trim() && newAuthor.trim()) {
      const quote: QuoteItem = {
        id: Date.now().toString(),
        body: newQuote.trim(),
        author: newAuthor.trim(),
        isFavorite: false,
        isUserAdded: true
      };
      
      // We keep it in state only (no DB save) as requested to remove the database part
      setQuotes([quote, ...quotes]);
      setNewQuote('');
      setNewAuthor('');
      setIsModalVisible(false);
      setActiveTab('my-quotes');
      setSearchQueries(prev => ({ ...prev, 'my-quotes': '' }));
    }
  };

  const handleDictSearch = async () => {
    if (!dictSearch.trim()) return;
    setIsLoading(true);
    try {
      const result = await fetchWordDefinition(dictSearch);
      setDictResult(result);
    } catch (err) {
      setDictResult({
        word: dictSearch,
        definition: "An error occurred while fetching the definition."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeTab
            quotes={filteredQuotes}
            isLoading={isLoading}
            onRefresh={onRefresh}
            searchQuery={currentSearchQuery}
            onSearchChange={(text) => setSearchQueries(prev => ({ ...prev, home: text }))}
            searchFilter={currentSearchFilter}
            onFilterChange={(filter) => { setSearchFilters(prev => ({ ...prev, home: filter })); setIsFilterMenuVisible(false); }}
            isFilterMenuVisible={isFilterMenuVisible}
            onToggleFilterMenu={() => setIsFilterMenuVisible(!isFilterMenuVisible)}
            viewType={currentViewType}
            onViewTypeChange={(type) => setViewTypes(prev => ({ ...prev, home: type }))}
            onToggleFavorite={handleToggleFavorite}
            onAddPress={() => setIsModalVisible(true)}
          />
        );
      case 'favorites':
        return (
          <SavedTab
            quotes={filteredQuotes}
            isLoading={isLoading}
            onRefresh={onRefresh}
            searchQuery={currentSearchQuery}
            onSearchChange={(text) => setSearchQueries(prev => ({ ...prev, favorites: text }))}
            searchFilter={currentSearchFilter}
            onFilterChange={(filter) => { setSearchFilters(prev => ({ ...prev, favorites: filter })); setIsFilterMenuVisible(false); }}
            isFilterMenuVisible={isFilterMenuVisible}
            onToggleFilterMenu={() => setIsFilterMenuVisible(!isFilterMenuVisible)}
            viewType={currentViewType}
            onViewTypeChange={(type) => setViewTypes(prev => ({ ...prev, favorites: type }))}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'my-quotes':
        return (
          <MineTab
            quotes={filteredQuotes}
            isLoading={isLoading}
            onRefresh={onRefresh}
            searchQuery={currentSearchQuery}
            onSearchChange={(text) => setSearchQueries(prev => ({ ...prev, 'my-quotes': text }))}
            searchFilter={currentSearchFilter}
            onFilterChange={(filter) => { setSearchFilters(prev => ({ ...prev, 'my-quotes': filter })); setIsFilterMenuVisible(false); }}
            isFilterMenuVisible={isFilterMenuVisible}
            onToggleFilterMenu={() => setIsFilterMenuVisible(!isFilterMenuVisible)}
            viewType={currentViewType}
            onViewTypeChange={(type) => setViewTypes(prev => ({ ...prev, 'my-quotes': type }))}
            onToggleFavorite={handleToggleFavorite}
            onAddPress={() => setIsModalVisible(true)}
          />
        );
      case 'dictionary':
        return (
          <DictionaryTab
            dictSearch={dictSearch}
            onDictSearchChange={setDictSearch}
            onSearchPress={handleDictSearch}
            dictResult={dictResult}
            onLogout={onLogout}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#333" />
          <Text style={styles.appBarTitle}>INSPIRE</Text>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>

      <View style={{ flex: 1 }}>
        {renderTabContent()}
      </View>

      <AddQuoteModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        newQuote={newQuote}
        onQuoteChange={setNewQuote}
        newAuthor={newAuthor}
        onAuthorChange={setNewAuthor}
        onAdd={handleAddQuote}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Ionicons name={activeTab === 'home' ? "home" : "home-outline"} size={24} color={activeTab === 'home' ? "#8B735B" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('favorites')}>
          <Ionicons name={activeTab === 'favorites' ? "heart" : "heart-outline"} size={24} color={activeTab === 'favorites' ? "#8B735B" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'favorites' && styles.navLabelActive]}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('my-quotes')}>
          <Ionicons name={activeTab === 'my-quotes' ? "list" : "list-outline"} size={24} color={activeTab === 'my-quotes' ? "#8B735B" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'my-quotes' && styles.navLabelActive]}>Mine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('dictionary')}>
          <Ionicons name={activeTab === 'dictionary' ? "book" : "book-outline"} size={24} color={activeTab === 'dictionary' ? "#8B735B" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'dictionary' && styles.navLabelActive]}>Words</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  appBarContainer: { backgroundColor: '#FFFFFF', zIndex: 10 },
  appBar: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  appBarTitle: { fontSize: 16, fontWeight: '600', letterSpacing: 4, color: '#333', marginLeft: 10, fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }) },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navLabel: { fontSize: 10, color: '#999', marginTop: 4, fontWeight: '500' },
  navLabelActive: { color: '#8B735B', fontWeight: '700' }
});
