import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface SearchBarProps {
  onSearch: (keyword: string, city: string, type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [eventType, setEventType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(keyword, city, eventType);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search events..."
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleSearch}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Type (e.g., Sports, Music)"
            value={eventType}
            onChangeText={setEventType}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 8,
    width: 48,
    height: 48,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    fontSize: 20,
  },
  filtersContainer: {
    marginTop: 12,
  },
  filterInput: {
    height: 44,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 8,
  },
  searchButton: {
    height: 44,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;
