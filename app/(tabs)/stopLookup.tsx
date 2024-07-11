import {Image, StyleSheet, Platform, ScrollView} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import StopSearch from '@/components/stops/StopSearch';
import {useState} from 'react';
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@/constants/Colors';
import DismissKeyboard from '@/components/DismissKeyboard';
import NearbyStops from '@/components/stops/NearbyStops';

export default function StopLookup() {
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
		<ScrollView contentContainerStyle={{flexGrow: 1}}>
			<ThemedView>
			<ThemedText style={styles.titleContainer}>Bus in Time</ThemedText>
			<ThemedText style={styles.greeting}>Good {timeofDay()}, {name}!</ThemedText>
			<ThemedText style={styles.title}>Search for a Stop</ThemedText>
			<StopSearch/>
			<NearbyStops/>
			</ThemedView>
		</ScrollView>
		</DismissKeyboard>
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
