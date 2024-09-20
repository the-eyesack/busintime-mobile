import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {Stack, useLocalSearchParams} from 'expo-router';
import {useEffect, useState} from 'react';
import {Button, Pressable, StyleSheet, View} from 'react-native';
import StopDisplayList from '@/app/bus/StopDisplayList';
import Loading from '@/components/Loading';
import {Colors} from '@/constants/Colors';


export default function Route() {
	const route = useLocalSearchParams()

	const [loading, setLoading] = useState<boolean>(true)

	const [stops, setStops] = useState([])
	const [ids, setIds] = useState([])

	const [destinations, setDestinations] = useState<string[]>([])
	const [currentStops, setCurrentStops] = useState({})

	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const [activatedDestination, setActivatedDestination] = useState<number>(0) //true=0, false=1

	useEffect(() => {
		// fetch(`http://localhost:5000/${Object.values(route)}`) // local dev
		fetch(`https://coral-app-o8edf.ondigitalocean.app/bus/${Object.values(route)}`)
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				if(data.error) {
					setErrorMessage(data.error)

				}
				setCurrentStops(data.currentStops)
				// @ts-ignore
				setStops([data.directions[0].stops.reverse(), data.directions[1].stops.reverse()])
				// @ts-ignore
				setIds([data.directions[0].ids, data.directions[1].ids])

				setDestinations([data.directions[0].destination, data.directions[1].destination])
				// console.log(data.directions[0].destination, data.directions[1].destination)

			})
			.then(() => setLoading(false))
			.catch(err => {
				setError(true);
			})
	}, []);

	function changeActivated(bool: boolean) {
		const selectedProperties = ['text-xl', 'font-bold', 'transition-all', 'delay-75']
		switch (bool) {
			case true: {
				setActivatedDestination(0);
				break
			}
			case false: {
				setActivatedDestination(1);
				break
			}
		}
	}

	useEffect(() => {
		changeActivated(true)
	}, []);

	// @ts-ignore
	// @ts-ignore
	return (
		<ThemedView>
		<Stack.Screen
			options={{
				title: Object.values(route).toString(),
			}}
		/>
			{/*select direction buttons*/}
			<View style={styles.directionContainer}>
				{/*@ts-ignore*/}
				<Pressable style={activatedDestination ?  '' : styles.highlight} onPress={()=>changeActivated(true)}><ThemedText style={styles.routeName}>{destinations[0]}</ThemedText></Pressable>
				{/*@ts-ignore*/}
				<Pressable style={activatedDestination ? styles.highlight : ''} onPress={()=>changeActivated(false)}><ThemedText style={styles.routeName}>{destinations[1]}</ThemedText></Pressable>
			</View>
			{/*@ts-ignore*/}

			{ error ? <View><ThemedText>{errorMessage}</ThemedText>
				<ThemedText style={{marginTop: 50}}>Tip: When searching for an SBS route, attach SBS or "+" at the end of the route name. Ex. "Q44 SBS" or "Q44+"
			</ThemedText>
			</View> : loading ? <Loading/> : <StopDisplayList key={activatedDestination} destination={destinations[activatedDestination]}
																										dir={stops[activatedDestination]} currentStops={currentStops} i={activatedDestination}
																										// @ts-ignore
																										route={route.route} ids={ids}/>}

		</ThemedView>
	);
}

const styles = StyleSheet.create({
	directionContainer: {
		borderBottomWidth: 2,
		borderColor: borderColor(),

	},
	routeName: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
	highlight: {
		backgroundColor: Colors.highlight,
	},
	text: {
		color: "#fff"
	}
})

function borderColor() {
	if (Colors.colorScheme == 'dark') {
		return Colors.white;
	} else return Colors.black;
}
