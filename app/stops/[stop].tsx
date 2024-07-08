import {useEffect, useState} from 'react';
import {Stack, useLocalSearchParams} from 'expo-router';
import {Animated, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import ScrollView = Animated.ScrollView;
import Loading from '@/components/Loading';
import moment from 'moment';
import {ThemedView} from '@/components/ThemedView';
import {Colors} from '@/constants/Colors';

export default function StopByRoute() {

	const { stop } = useLocalSearchParams()

	const [loading, setLoading] = useState<boolean>(true)
	// @ts-ignore
	const id = stop.replace('MTA_', '')
	const [stopName, setStopName] = useState<string>()
	const [buses, setBuses] = useState([])
	useEffect(() => {
		console.log(id)
		// fetch(`http://localhost:5000/stops/${id}`) // local dev
			fetch(`https://coral-app-o8edf.ondigitalocean.app/stops/${id}`)
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
			<Stack.Screen
				options={{
					title: "Stop " + id,
				}}
			/>
			<ThemedText style={styles.header}>{stopName}</ThemedText>
			<ThemedText style={styles.stopCode}>Stop Code <ThemedText style={styles.id}>{id}</ThemedText></ThemedText>
			<ScrollView style={styles.flex}>
				{loading ? <Loading/> : buses.map((bus, i) => {
					if(moment(bus['arrival_time']).format() !== 'Invalid date') return (
						<View key={i} style={styles.group}>
							<ThemedText style={styles.timeBox}>{bus['route']} {moment().to(bus['arrival_time'])} ({moment(bus['arrival_time']).format('h:mm a')})</ThemedText>
						</View>
					)})}
			</ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	group: {
		flex: 1,
		display: 'flex'
	},
	header: {
		fontSize: 48,
		fontWeight: 'bold',
		padding: 4,
		lineHeight: 50
	},
	stopCode: {
		marginTop: 10
	},
	id: {
		color: Colors.highlight
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