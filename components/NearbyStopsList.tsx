import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {Colors} from '@/constants/Colors';
import {useEffect, useState} from 'react';

export default function NearbyStopsList(props: { longitude: number; latitude: number; }) {
	const key = process.env.EXPO_PUBLIC_MTA_KEY;
	const [stops, setStops] = useState([])
	const [loading, setLoading] = useState(true)

	// distance between points (meters)
	function haversine(lat1: number | undefined, lon1: number | undefined, lat2: number, lon2: number) {
		const R = 6371e3;
		// @ts-ignore
		const p1 = lat1 * Math.PI/180;
		const p2 = lat2 * Math.PI/180;
		// @ts-ignore
		const deltaLon = lon2 - lon1;
		const deltaLambda = (deltaLon * Math.PI) / 180;
		const d = Math.acos(
			Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
		) * R;
		return Math.round(d/1609*100)/100; // divide by 1609 for miles
	}

	useEffect(() => {
		fetch(`https://bustime.mta.info/api/where/stops-for-location.json?key=${key}&lat=${props.latitude}&lon=${props.longitude}`)
			.then((response) => response.json())
			.then((json) => {
				let packet:any = [];
				json['data']['stops'].map( (stop: any) => {
					let routes:[string] = stop['routes'].map((route: any) => route['shortName'])
					let distance = haversine(props.latitude, props.longitude, stop['lat'], stop['lon'])
					packet.push({name: stop['name'], distance: distance, code: stop['code'], routes: routes})
				})
				console.log(json['data']['stops'])
				setStops(packet)
				setLoading(false)
			})
	}, []);

	return (
		<ScrollView>
			<ThemedText>Nearby Stops</ThemedText>
				{stops.slice(0,5).map((stop, i) => {
					return <View style={styles.infoContainer}>
						<View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
							<ThemedText style={styles.name}>{stop['name']}</ThemedText>
							<ThemedText>{stop['distance']}mi away</ThemedText>
						</View>
						<View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
							{/*@ts-ignore*/}
							{stop['routes'].map((bus:string) => {
								return <ThemedText style={styles.busCircle}>{bus}</ThemedText>
							})}</View>
						<ThemedText>{stop['code']}</ThemedText>
					</View>
				})}
		</ScrollView>
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
		marginBottom: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: 'center',
	},
});