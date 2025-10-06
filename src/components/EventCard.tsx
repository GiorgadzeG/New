import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Event } from '../types/event.types';
import { formatDate, getEventImage, getVenueLocation, getEventType } from '../utils/formatters';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const imageUrl = getEventImage(event.images);
  const venue = event._embedded?.venues?.[0];
  const location = getVenueLocation(venue);
  const date = formatDate(
    event.dates?.start?.localDate,
    event.dates?.start?.localTime
  );
  const eventType = getEventType(event.classifications);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{eventType}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {event.name}
        </Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  typeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  type: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default EventCard;
