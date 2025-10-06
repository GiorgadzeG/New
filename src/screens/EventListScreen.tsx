import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ticketmasterService from '../services/ticketmaster.service';
import { Event } from '../types/event.types';
import { RootStackParamList, MainTabParamList } from '../navigation/types';

type EventListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'EventList'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: EventListScreenNavigationProp;
}

const EventListScreen: React.FC<Props> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    city: '',
    type: '',
  });

  useEffect(() => {
    loadEvents(0, true);
  }, []);

  const loadEvents = async (pageNum: number, isRefresh: boolean = false) => {
    try {
      if (isRefresh) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await ticketmasterService.searchEvents({
        keyword: searchParams.keyword || undefined,
        city: searchParams.city || undefined,
        classificationName: searchParams.type || undefined,
        page: pageNum,
        size: 20,
      });

      const newEvents = response._embedded?.events || [];

      if (isRefresh) {
        setEvents(newEvents);
      } else {
        setEvents(prev => [...prev, ...newEvents]);
      }

      setPage(pageNum);
      setHasMore(newEvents.length === 20);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (keyword: string, city: string, type: string) => {
    setSearchParams({ keyword, city, type });
    setTimeout(() => {
      loadEvents(0, true);
    }, 100);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadEvents(0, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadEvents(page + 1, false);
    }
  };

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetails', { event });
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#6366f1" />
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {events.length === 0 ? (
        <EmptyState
          message="No events found. Try searching for something!"
          icon="🎭"
        />
      ) : (
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => handleEventPress(item)} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#6366f1"
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default EventListScreen;
