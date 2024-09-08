import {Image, StyleSheet, Platform, ScrollView, Keyboard,  TouchableWithoutFeedback } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import BusSearch from '@/components/BusSearch';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DismissKeyboard from '@/components/DismissKeyboard';


export default function HomeScreen() {
  const [name, setName] = useState('');

  const timeofDay = () => {
      const hour = moment().hour();
      if (hour >= 5 && hour < 12) {
        return "morning";
      } else if (hour >= 12 && hour < 17) {
        return "afternoon";
      } else {
        return "evening";
      }
    }



  useState(async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setName(value)
      } else setName('User')
    } catch (e) {
      console.log('error reading username')
    }
  })
  return (
      <DismissKeyboard>
      <ThemedView style={{flex:1}}>
        <ThemedText style={styles.titleContainer}>Bus in Time</ThemedText>
          <ThemedText style={styles.greeting}>Good {timeofDay()}, {name}!</ThemedText>
          <ThemedText style={styles.title}>Search for Bus</ThemedText>
          <BusSearch/>
          <ThemedText style={styles.bottomtext}>For NYC MTA buses.</ThemedText>
      </ThemedView>
      </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  bottomtext: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 24,
      textAlign: 'center',
      marginTop: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  greeting: {
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  }
});

