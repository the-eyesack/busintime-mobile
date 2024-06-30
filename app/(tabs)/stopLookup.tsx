import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import StopSearch from '@/components/StopSearch';

export default function StopLookup() {
	return (
		<ThemedView>
			<ThemedText style={styles.titleContainer}>Bus in Time</ThemedText>
			<StopSearch/>
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
