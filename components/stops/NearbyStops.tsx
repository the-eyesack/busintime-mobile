import {ThemedText} from '@/components/ThemedText';
import * as Location from 'expo-location';
import {useEffect, useState} from 'react';
import {ThemedView} from '@/components/ThemedView';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '@/constants/Colors';

export default function NearbyStops() {
	const key = process.env.EXPO_PUBLIC_MTA_KEY;
	const [errorMsg, setErrorMsg] = useState(null);
	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const [stops, setStops] = useState([])
	const [loading, setLoading] = useState(true)

	// distance between points (meters)
	function haversine(lat1:number, lon1:number, lat2:number, lon2:number) {
		const R = 6371e3;
		const p1 = lat1 * Math.PI/180;
		const p2 = lat2 * Math.PI/180;
		const deltaLon = lon2 - lon1;
		const deltaLambda = (deltaLon * Math.PI) / 180;
		const d = Math.acos(
			Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
		) * R;
		return Math.round(d/1609*100)/100; // divide by 1609 for miles
	}

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
		})();
		fetch(`https://bustime.mta.info/api/where/stops-for-location.json?key=${key}&lat=${latitude}&lon=${longitude}`)
			.then((response) => response.json())
			.then((json) => {
				let packet = [];
				json['data']['stops'].map( (stop: any) => {
					let routes:[string] = stop['routes'].map((route: any) => route['shortName'])
					let distance = haversine(latitude, longitude, stop['lat'], stop['lon'])
					packet.push({name: stop['name'], distance: distance, code: stop['code'], routes: routes})
				})
				console.log(json['data']['stops'])
				setStops(packet)
			})
			.then(setLoading(false))
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else {
		text = JSON.stringify(longitude) + " " + JSON.stringify(latitude);
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedText>Nearby Stops </ThemedText>
			<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
				{loading ? <ThemedText>Loading...</ThemedText> :
					<View>
						{stops.slice(0,5).map((stop, i) => {
							return (
								<View style={styles.infoContainer}>
									<View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
										<ThemedText style={styles.name}>{stop['name']}</ThemedText>
										<ThemedText>{stop['distance']}mi away</ThemedText>
									</View>
								<View style={{display: 'flex', flexDirection: 'row', gap: 10}}>{stop['routes'].map((bus:string) => {
									return <ThemedText style={styles.busCircle}>{bus}</ThemedText>
								}) }</View>
								<ThemedText>{stop['code']}</ThemedText></View>)
						})}
					</View>
				}
			</ScrollView>

		</ThemedView>
	)
}

const styles = StyleSheet.create({
	name: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	busCircle: {
		backgroundColor: Colors.yellow,
		padding: 2,
		borderRadius: 10,
		overflow: 'hidden',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	infoContainer: {
		marginBottom: 20
	},
	paragraph: {
		fontSize: 18,
		textAlign: 'center',
	},
});