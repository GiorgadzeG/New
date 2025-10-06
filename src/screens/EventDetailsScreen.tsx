import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useFavorites } from '../contexts/FavoritesContext';
import { formatDate, getEventImage, getVenueLocation } from '../utils/formatters';
import { RootStackParamList } from '../navigation/types';

type EventDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventDetails'
>;
type EventDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

interface Props {
  navigation: EventDetailsScreenNavigationProp;
  route: EventDetailsScreenRouteProp;
}

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const { event } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(event.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  const handleOpenUrl = () => {
    if (event.url) {
      Linking.openURL(event.url);
    }
  };

  const imageUrl = getEventImage(event.images);
  const venue = event._embedded?.venues?.[0];
  const location = getVenueLocation(venue);
  const date = formatDate(
    event.dates?.start?.localDate,
    event.dates?.start?.localTime
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.name}</Text>
          </View>
          <TouchableOpacity
            style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{location}</Text>
          </View>
          {venue?.address?.line1 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🏢</Text>
              <Text style={styles.infoText}>{venue.address.line1}</Text>
            </View>
          )}
        </View>

        {event.info && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information</Text>
            <Text style={styles.sectionText}>{event.info}</Text>
          </View>
        )}

        {event.pleaseNote && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Please Note</Text>
            <Text style={styles.sectionText}>{event.pleaseNote}</Text>
          </View>
        )}

        {event._embedded?.attractions && event._embedded.attractions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attractions</Text>
            {event._embedded.attractions.map((attraction, index) => (
              <Text key={index} style={styles.attractionText}>
                • {attraction.name}
              </Text>
            ))}
          </View>
        )}

        {event.url && (
          <TouchableOpacity style={styles.ticketButton} onPress={handleOpenUrl}>
            <Text style={styles.ticketButtonText}>Get Tickets</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: 36,
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#fee2e2',
  },
  favoriteIcon: {
    fontSize: 28,
  },
  infoSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
  },
  attractionText: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 22,
  },
  ticketButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  ticketButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventDetailsScreen;
