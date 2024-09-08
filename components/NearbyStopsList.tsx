import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {Colors} from '@/constants/Colors';
import {useEffect, useState} from 'react';
import {Link} from 'expo-router';
import {ThemedView} from '@/components/ThemedView';

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
		// fetch(`http://localhost:5000/nearby/${props.latitude.toString().replace('-', 'n').replace('.', 'd')}/${props.longitude.toString().replace('-', 'n').replace('.', 'd')}`)
		fetch(`https://coral-app-o8edf.ondigitalocean.app/nearby/${props.latitude.toString().replace('-', 'n').replace('.', 'd')}/${props.longitude.toString().replace('-', 'n').replace('.', 'd')}`)
	.then((response) => response.json())
			.then((json) => {
				// console.log(json)
				let packet:any = [];
				json['data']['stops'].map( (stop: any) => {
					let routes:[string] = stop['routes'].map((route: any) => route['shortName'])
					let distance = haversine(props.latitude, props.longitude, stop['lat'], stop['lon'])
					packet.push({name: stop['name'], distance: distance, code: stop['code'], routes: routes})
				})
				// console.log(json['data']['stops'])
				setStops(packet.sort((a: any, b: any) => a['distance'] - b['distance']))
				setLoading(false)
			})
			.catch((error) => console.error(error))
	}, []);

	return (
		<ThemedView>
				{stops.slice(0,10).map((stop, i) => {
					return <View key={i} style={styles.infoContainer}>
						<View style={{display: 'flex', flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
							<Link href={{pathname: `/stops/[stop]`,
								params: {stop: stop['code']}}}><ThemedText style={styles.name}>{stop['name']}</ThemedText></Link>
							<ThemedText>{stop['distance']}mi away</ThemedText>
						</View>
						<View  style={{display: 'flex', flexDirection: 'row', gap: 10}}>
							{/*@ts-ignore*/}
							{stop['routes'].map((bus:string) => {
								return <ThemedText style={styles.busCircle}>{bus}</ThemedText>
							})}</View>
						{/*<ThemedText>Stop Code {stop['code']}</ThemedText>*/}
					</View>
				})}
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
	infoContainer: {
		marginBottom: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: 'center',
	},
});