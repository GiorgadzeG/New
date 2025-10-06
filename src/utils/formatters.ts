export const formatDate = (dateString?: string, timeString?: string): string => {
  if (!dateString) return 'Date TBA';
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  let formatted = date.toLocaleDateString('en-US', options);
  
  if (timeString) {
    formatted += ` at ${timeString}`;
  }
  
  return formatted;
};

export const getEventImage = (images?: any[]): string => {
  if (!images || images.length === 0) {
    return 'https://via.placeholder.com/400x300?text=No+Image';
  }
  
  // Find best quality image (preferring 16:9 ratio)
  const image = images.find(img => img.ratio === '16_9' && img.width >= 640) || images[0];
  return image.url;
};

export const getVenueLocation = (venue?: any): string => {
  if (!venue) return 'Location TBA';
  
  const parts = [];
  if (venue.name) parts.push(venue.name);
  if (venue.city?.name) parts.push(venue.city.name);
  if (venue.state?.stateCode) parts.push(venue.state.stateCode);
  
  return parts.join(', ') || 'Location TBA';
};

export const getEventType = (classifications?: any[]): string => {
  if (!classifications || classifications.length === 0) return 'Event';
  
  const classification = classifications[0];
  return classification.segment?.name || classification.genre?.name || 'Event';
};
