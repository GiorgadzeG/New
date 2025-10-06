export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface DateInfo {
  localDate?: string;
  localTime?: string;
  dateTime?: string;
  dateTBD?: boolean;
  dateTBA?: boolean;
  timeTBA?: boolean;
  noSpecificTime?: boolean;
}

export interface Dates {
  start: DateInfo;
  timezone?: string;
  status?: {
    code: string;
  };
  spanMultipleDays?: boolean;
}

export interface Classification {
  primary: boolean;
  segment?: {
    id: string;
    name: string;
  };
  genre?: {
    id: string;
    name: string;
  };
  subGenre?: {
    id: string;
    name: string;
  };
  type?: {
    id: string;
    name: string;
  };
  subType?: {
    id: string;
    name: string;
  };
  family?: boolean;
}

export interface Venue {
  name: string;
  type: string;
  id: string;
  url?: string;
  locale?: string;
  images?: Image[];
  postalCode?: string;
  timezone?: string;
  city?: {
    name: string;
  };
  state?: {
    name: string;
    stateCode: string;
  };
  country?: {
    name: string;
    countryCode: string;
  };
  address?: {
    line1: string;
  };
  location?: {
    longitude: string;
    latitude: string;
  };
}

export interface Attraction {
  name: string;
  type: string;
  id: string;
  url?: string;
  locale?: string;
  images?: Image[];
  classifications?: Classification[];
}

export interface Event {
  name: string;
  type: string;
  id: string;
  test?: boolean;
  url?: string;
  locale?: string;
  images?: Image[];
  dates?: Dates;
  classifications?: Classification[];
  info?: string;
  pleaseNote?: string;
  _embedded?: {
    venues?: Venue[];
    attractions?: Attraction[];
  };
}

export interface PageInfo {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface Links {
  first?: { href: string };
  self?: { href: string };
  next?: { href: string };
  last?: { href: string };
}

export interface EventsResponse {
  _embedded?: {
    events: Event[];
  };
  _links: Links;
  page: PageInfo;
}
