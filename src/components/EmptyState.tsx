import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  message?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No events found',
  icon = '🔍',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default EmptyState;
