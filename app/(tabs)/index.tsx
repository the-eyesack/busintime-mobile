import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import BusSearch from '@/components/BusSearch';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [name, setName] = useState('');
  useState(async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setName(value)
      }
    } catch (e) {
      console.log('error reading username')
    }
  })
  return (
      <ThemedView>

      <ThemedText style={styles.titleContainer}>Bus in Time</ThemedText>
        <ThemedText>Good morning, {name}</ThemedText>

        <BusSearch/>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 24,
      textAlign: 'center',
      marginTop: 100
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

