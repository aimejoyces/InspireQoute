import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ScrollView
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const dummyQuotes = [
  {
    id: '1',
    body: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
    author: 'Ime Joy'
  },
  {
    id: '2',
    body: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    id: '3',
    body: 'Be the change that you wish to see in the world.',
    author: 'Mahatma Gandhi'
  }
];

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  const renderQuoteCard = ({ item }: { item: typeof dummyQuotes[0] }) => (
    <View style={styles.card}>
      <MaterialCommunityIcons name="format-quote-open" size={24} color="#D1D1D1" style={styles.quoteIconStart} />
      <Text style={styles.cardQuote}>{item.body}</Text>
      <MaterialCommunityIcons name="format-quote-close" size={24} color="#D1D1D1" style={styles.quoteIconEnd} />
      <Text style={styles.cardAuthor}>— {item.author}</Text>
    </View>
  );

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* App Bar */}
      <SafeAreaView style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#333" />
          <Text style={styles.appBarTitle}>INSPIRE</Text>
          <View style={{ width: 24 }} /> {/* Spacer to center the title */}
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Area */}
        <View style={styles.heroContainer}>
          <View style={styles.heroContent}>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
            <Text style={styles.affirmationText}>Today, I'm grateful for the sunshine.</Text>
          </View>
          
          {/* Curved Bottom Edge */}
          <View style={styles.svgContainer}>
            <Svg height="60" width={width} viewBox={`0 0 ${width} 60`} preserveAspectRatio="none">
              <Path
                d={`M0 0 Q${width / 2} 60 ${width} 0 V0 H0 Z`}
                fill="#FDF5E6" // light beige/cream
              />
            </Svg>
          </View>

          {/* Floating Action Button (FAB) */}
          <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
            <Ionicons name="add" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search & Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search quotes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          </View>
          
          <View style={styles.viewToggles}>
            <TouchableOpacity onPress={() => setViewType('grid')} style={styles.toggleBtn}>
              <Ionicons name="grid-outline" size={22} color={viewType === 'grid' ? '#333' : '#CCC'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType('list')} style={styles.toggleBtn}>
              <Ionicons name="list" size={24} color={viewType === 'list' ? '#333' : '#CCC'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quote Card List */}
        <View style={styles.listContainer}>
          {dummyQuotes.map((item) => (
            <React.Fragment key={item.id}>
              {renderQuoteCard({ item })}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navTextIcon}>Aa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  appBarContainer: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  appBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  appBarTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 4,
    color: '#333',
    marginLeft: 10,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  heroContainer: {
    backgroundColor: '#FDF5E6', // OldLace/Light beige
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
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
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
    bottom: 30, // Centered on the boundary
    alignSelf: 'center',
    backgroundColor: '#8B735B', // Warm brown
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
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
  listContainer: {
    paddingHorizontal: 20,
  },
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
  quoteIconStart: {
    marginBottom: 10,
  },
  quoteIconEnd: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  cardQuote: {
    fontSize: 18,
    color: '#444',
    lineHeight: 26,
    fontFamily: Platform.select({ ios: 'System', android: 'serif' }),
    fontStyle: 'italic',
  },
  cardAuthor: {
    fontSize: 14,
    color: '#777',
    textAlign: 'right',
    marginTop: 15,
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTextIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  }
});
