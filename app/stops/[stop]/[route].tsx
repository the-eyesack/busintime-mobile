import {useEffect, useState} from 'react';
import {Stack, useLocalSearchParams} from 'expo-router';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import ScrollView = Animated.ScrollView;
import Loading from '@/components/Loading';
import moment from 'moment';
import {ThemedView} from '@/components/ThemedView';
import {Colors} from '@/constants/Colors';

export default function StopByRoute() {

	const {route, stop } = useLocalSearchParams()

	const [loading, setLoading] = useState<boolean>(true)
	// @ts-ignore
	const id = stop.replace('MTA_', '')
	const [stopName, setStopName] = useState<string>()
	const [buses, setBuses] = useState([])
	useEffect(() => {
		console.log(route, id)
		// fetch(`http://localhost:5000/${route}/${id}`) // local dev
		fetch(`https://coral-app-o8edf.ondigitalocean.app/${route}/${id}`)
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
			<View>
				{/*@ts-ignore*/}
				<ThemedText style={styles.routeName}>{route.toString()}</ThemedText>
				{/*<ThemedText>{stopName}</ThemedText>*/}
			</View>

			<ThemedText style={styles.stopCode}>Stop Code <ThemedText style={styles.id}>{id}</ThemedText></ThemedText>
			<ScrollView style={styles.flex}>
				{loading ? <Loading/> : buses.map((bus, i) => {
					if(moment(bus['arrival_time']).format() !== 'Invalid date') return (
						<View style={styles.timeContainer}>
						<ThemedText key={i} id={'timeuntil'+i} style={styles.timeNumber}>{moment().to(bus['arrival_time']).replace('in ', '')}</ThemedText>
						<ThemedText style={styles.time}>({moment(bus['arrival_time']).format('h:mm a')})</ThemedText>
						</View>

					)})}
			</ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	timeContainer: {
		display: 'flex',
		marginTop: 24,
		flexDirection: 'row',

	},
	routeName: {
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
	timeNumber: {
		fontSize: 32,
		textAlignVertical: 'top',
		paddingBottom: 6,
		paddingLeft: 12,
		width: 180
	},
	time: {
		marginTop: 'auto',
		paddingLeft: 6
	},
	flex: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	flexRow: {
		flexDirection: 'row',
		gap: 10,
		verticalAlign: 'bottom',
		marginTop: 20,
		borderWidth: 1,
	},
})