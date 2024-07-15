import {ThemedText} from '@/components/ThemedText';
import * as Location from 'expo-location';
import {useEffect, useState} from 'react';
import {ThemedView} from '@/components/ThemedView';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '@/constants/Colors';
import Loading from '@/components/Loading';
import NearbyStopsList from '@/components/stops/NearbyStopsList';

export default function NearbyStops() {
	const [errorMsg, setErrorMsg] = useState(null);
	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const [stops, setStops] = useState([])
	const [loading, setLoading] = useState(true)

	function refresh() {
		(async () => {
			setLoading(true)
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				// @ts-ignore
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLatitude(location.coords.latitude);
			setLongitude(location.coords.longitude);
			console.log(location.coords.latitude, location.coords.longitude)
			setLoading(false)
		})()
	}

	useEffect(() => {
		refresh()
		;
	}, []);

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title}>Nearby Stops</ThemedText>
			<Button title={'Refresh'} onPress={refresh}/>
			{/*@ts-ignore*/}
			{loading ? <Loading/> : <NearbyStopsList longitude={longitude} latitude={latitude}/>}
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		flexDirection: 'column'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10
	}
});