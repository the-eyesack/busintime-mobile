import {Image, StyleSheet, Platform, TextInput, useColorScheme, Button, View} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import BusSearch from '@/components/BusSearch';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from 'expo-router';

export default function HomeScreen() {
	const [name, setName] = useState('Enter name');
	let colorScheme = useColorScheme()

	async function handleNameSubmit() {
		try {
			await AsyncStorage.setItem('username', name)
			console.log(`successfuly set username to ${name}`)
		} catch (e) {
			console.log("error saving username")
		}
	}
	useState(async () => {
		try {
			const value = await AsyncStorage.getItem('username');
			if (value !== null) {
				setName(value)
			}
		} catch (e) {
			console.log('error reading username')
		}
	})

	return (
		<ThemedView>
			<ThemedText style={styles.titleContainer}>Settings</ThemedText>
			<View style={styles.flexbox}>
				<ThemedText>Set Username:</ThemedText>
				<TextInput style={colorScheme === 'dark' ? styles.darkModeText : styles.lightSearchbox} placeholder={name} placeholderTextColor={colorScheme === 'dark' ? "#fff" : "#000"} onChangeText={setName} value={name}/>
				<Button title={"Submit"} onPress={()=>handleNameSubmit()}/>
			</View>
			<ThemedText>Version 0.0.1 developed by <Link href={'https://github.com/the-eyesack'}>@the-eyesack</Link></ThemedText>
		</ThemedView>
	);
}
const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		fontSize: 24,
		textAlign: 'center',
		marginTop: 100
	},
	button: {
		color: 'white',
		borderWidth: 1,
		borderRadius: 8,
		borderColor: 'white',
		padding: 2,
		margin: 10
	},
	darkModeText: {
		color: "white"
	},
	lightModeText: {
		color: "black"
	},
	flexbox: {
		display: "flex",
		flexDirection: "row",
		gap: 10
	},
	lightSearchbox: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		marginTop: 8,
		color: "black",
	},
	darkSearchbox: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "white",
		padding: 8,
		marginTop: 8,
		color: "white",
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		fontSize: 24,
		textAlign: 'center',
		marginTop: 100
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
});
