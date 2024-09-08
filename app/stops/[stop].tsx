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
	const [routes, setRoutes] = useState<String[]>([])
	const [listOfRoutes, setListofRoutes] = useState<String[]>([])
	useEffect(() => {
		// console.log(id)
		// fetch(`http://localhost:5000/stops/${id}`) // local dev
			fetch(`https://coral-app-o8edf.ondigitalocean.app/stops/${id}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setStopName(data['stop_name'])
				setBuses(data['buses'])
				setLoading(false)
			})
			// .then(()=> {
			// 	let hold = []
			// 	for (let i in buses) {
			// 		if(listOfRoutes.indexOf(buses[i]['route']) === -1) {
			// 			hold.push(buses[i]['route'])
			// 		}
			// 	}
			// })
			.catch(err => alert("An error has occurred. Please ensure the stop number was typed in correctly and try again."))

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
			{loading? <Loading/> : routes.map((route) => (
				<View>
					<ThemedText>{route}</ThemedText>
				</View>
			))}
			<ScrollView style={styles.flex}>
				{loading ? '' : 
				buses.map((bus, i) => {
					if(moment(bus['arrival_time']).format() !== 'Invalid date') return (
						<View key={i} style={styles.group}>
							<View style={styles.grid}>
								<ThemedText style={{width: 70}}>{bus['route']}</ThemedText>
								<ThemedText style={{width: 150}}>{moment().to(bus['arrival_time'])}</ThemedText>
								<ThemedText>{moment(bus['arrival_time']).format('h:mm a')}</ThemedText>
							{/* <ThemedText style={styles.timeBox}>{bus['route']} {moment().to(bus['arrival_time'])} ({moment(bus['arrival_time']).format('h:mm a')})</ThemedText>								 */}
							</View>
						</View>
					)})}
			</ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	grid: {
		flex: 3,
		flexDirection: 'row',
		gap: 10
	},
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