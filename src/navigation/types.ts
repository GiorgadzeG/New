import { Event } from '../types/event.types';

export type RootStackParamList = {
  MainTabs: undefined;
  EventDetails: { event: Event };
};

export type MainTabParamList = {
  EventList: undefined;
  Favorites: undefined;
};
