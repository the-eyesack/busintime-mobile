import {ThemedText} from '@/components/ThemedText';
import * as Location from 'expo-location';
import {useEffect, useState} from 'react';
import {ThemedView} from '@/components/ThemedView';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '@/constants/Colors';
import Loading from '@/components/Loading';
import NearbyStopsList from '@/components/NearbyStopsList';

export default function NearbyStops() {
	const [errorMsg, setErrorMsg] = useState(null);
	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const [stops, setStops] = useState([])
	const [loading, setLoading] = useState(true)



	useEffect(() => {
		(async () => {

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
		})();
	}, []);

	return (
		<ThemedView style={styles.container}>
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
});