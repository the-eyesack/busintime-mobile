import {useEffect, useState} from 'react';
import {useLocalSearchParams} from 'expo-router';
import {Animated, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import ScrollView = Animated.ScrollView;
import Loading from '@/components/Loading';
import moment from 'moment';
import {ThemedView} from '@/components/ThemedView';

export default function StopByRoute() {

	const {route, stop } = useLocalSearchParams()

	const [loading, setLoading] = useState<boolean>(true)
	const id = stop.replace('MTA_', '')
	const [stopName, setStopName] = useState<string>()
	const [buses, setBuses] = useState([])
	useEffect(() => {
		console.log(route, id)
		fetch(`http://localhost:5000/${route}/${id}`) // local dev
		// fetch(`https://coral-app-o8edf.ondigitalocean.app/${route}/${id}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setStopName(data['stop_name'])
				setBuses(data['buses'])
			})
			.then(() => setLoading(false))
			.catch(err => console.log(err))
	}, []);

	return (
		<ThemedView>
			<ThemedText style={styles.header}>{route}</ThemedText>
			<ThemedText style={styles.stopCode}>Stop Code <span style={styles.id}>{id}</span></ThemedText>
			<ScrollView style={styles.flex}>
				{loading ? <Loading/> : buses.map((bus, i) => {
					if(moment(bus['arrival_time']).format() !== 'Invalid date') return (
						<ThemedText key={i} style={styles.timeBox}>{moment().to(bus['arrival_time'])} ({moment(bus['arrival_time']).format('h:mm a')})</ThemedText>
					)})}
			</ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	header: {
		fontSize: 48,
		fontWeight: 'bold',
		padding: 4
	},
	stopCode: {
		marginTop: 10
	},
	id: {
		color: "#ff0000"
	},
	timeBox: {
		textAlign: 'center',
	},
	flex: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10
	}
})