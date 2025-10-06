import axios from 'axios';
import { EventsResponse } from '../types/event.types';

const API_KEY = 'y7LxXcMQYhJ3iMO9p9qLJBduVURdaMyG'; // Replace with your Ticketmaster API key
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export interface SearchParams {
  keyword?: string;
  city?: string;
  classificationName?: string;
  page?: number;
  size?: number;
}

class TicketmasterService {
  async searchEvents(params: SearchParams): Promise<EventsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/events.json`, {
        params: {
          apikey: API_KEY,
          keyword: params.keyword,
          city: params.city,
          classificationName: params.classificationName,
          page: params.page || 0,
          size: params.size || 20,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async getEventById(eventId: string): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/events/${eventId}.json`, {
        params: {
          apikey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  }
}

export default new TicketmasterService();
