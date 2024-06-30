import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {useLocalSearchParams} from 'expo-router';
import {useEffect, useState} from 'react';
import {Button, Pressable, View} from 'react-native';
import StopDisplayList from '@/app/bus/StopDisplayList';
import Loading from '@/components/Loading';

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
		fetch(`http://localhost:5000/${Object.values(route)}`) // local dev
		// fetch(`https://coral-app-o8edf.ondigitalocean.app/${Object.values(route)}`)
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				if(data.error) setErrorMessage(data.error)
				setCurrentStops(data.currentStops)
				// @ts-ignore
				setStops([data.directions[0].stops, data.directions[1].stops])
				setIds([data.directions[0].ids, data.directions[1].ids])

				setDestinations([data.directions[0].destination, data.directions[1].destination])
				console.log(data.directions[0].destination, data.directions[1].destination)

			})
			.then(() => setLoading(false))
			.catch(err => {
				setError(true);
				setLoading(false);
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

	return (
		<ThemedView>
			<ThemedText>{Object.values(route)}</ThemedText>
			{/* select direction*/}
			<View>
				<Pressable onPress={()=>changeActivated(true)}> <ThemedText>{destinations[0]}</ThemedText></Pressable>
				<Pressable onPress={()=>changeActivated(false)}> <ThemedText>{destinations[1]}</ThemedText></Pressable>
			</View>


			{loading ? <Loading/> : <StopDisplayList key={activatedDestination} destination={destinations[activatedDestination]}
							  dir={stops[activatedDestination]} currentStops={currentStops} i={activatedDestination}
							  route={route.route} ids={ids}/>}
		</ThemedView>
	);
}