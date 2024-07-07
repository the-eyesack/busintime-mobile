import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import StopSearch from '@/components/StopSearch';
import {useState} from 'react';
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@/constants/Colors';
import DismissKeyboard from '@/components/DismissKeyboard';

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
		<ThemedView>
			<ThemedText style={styles.titleContainer}>Bus in Time</ThemedText>
			<ThemedText style={styles.greeting}>Good {timeofDay()}, {name}!</ThemedText>
			<ThemedText >Search for a Stop</ThemedText>
			<StopSearch/>
		</ThemedView>
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
	greeting: {
		fontWeight: 'bold',
		marginBottom: 24,
		textAlign: 'center'
	}
});
