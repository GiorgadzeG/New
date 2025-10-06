import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFavorites } from '../contexts/FavoritesContext';
import { Event } from '../types/event.types';
import { RootStackParamList, MainTabParamList } from '../navigation/types';

type FavoritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Favorites'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: FavoritesScreenNavigationProp;
}

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const { favorites, loading } = useFavorites();

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetails', { event });
  };

  if (loading) {
    return <LoadingSpinner message="Loading favorites..." />;
  }

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <EmptyState
          message="No favorite events yet. Start adding some!"
          icon="❤️"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => handleEventPress(item)} />
          )}
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
});

export default FavoritesScreen;
