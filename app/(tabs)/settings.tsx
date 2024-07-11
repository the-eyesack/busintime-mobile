import {Image, StyleSheet, Platform, TextInput, useColorScheme, Alert, View, Pressable} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import BusSearch from '@/components/BusSearch';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from 'expo-router';
import {Colors} from '@/constants/Colors';
import json from '@/app.json';
import DismissKeyboard from '@/components/DismissKeyboard';

export default function HomeScreen() {
	const [name, setName] = useState('');
	let colorScheme = useColorScheme()
	const version = json.expo.version

	async function handleNameSubmit() {
		try {
			await AsyncStorage.setItem('username', name)
			Alert.alert(`Successfully set username to ${name}.`)
		} catch (e) {
			Alert.alert("There was an error saving your username. Please try again.")
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
		<DismissKeyboard>
		<ThemedView>
			<ThemedText style={styles.titleContainer}>Settings</ThemedText>
			<View style={styles.flexbox}>
				<ThemedText>Set Username:</ThemedText>
				<TextInput style={colorScheme === 'dark' ? styles.darkModeText : styles.lightSearchbox} placeholder={name == '' ? 'Enter name' : name} placeholderTextColor={colorScheme === 'dark' ? "#fff" : "#000"} onChangeText={setName} value={name}/>
				<Pressable style={styles.button} onPress={()=>handleNameSubmit()}>
					<ThemedText>Submit</ThemedText>
				</Pressable>
			</View>
			<View style={{flex: 1, flexWrap: 'wrap', position: 'absolute', left: 0, bottom: 0, fontSize: 15}}>
				<ThemedText>Version {version}</ThemedText>
				<Link href={'https://github.com/the-eyesack'}><ThemedText>Developed and maintained by @the-eyesack</ThemedText></Link>
			</View>
		</ThemedView>
		</DismissKeyboard>
	);
}
const styles = StyleSheet.create({
	button: {
		flex: 1,
		borderWidth: 2,
		borderRadius: 4,
		backgroundColor: Colors.pink,
		textAlign: 'center',
		textAlignVertical: 'center',
		alignItems: 'center',
		marginHorizontal: 10
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
		gap: 10,
		justifyContent: 'center',
		textAlign: 'center'
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
