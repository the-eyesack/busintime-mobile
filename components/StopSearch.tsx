// this is for looking up a stop (textbox)
import {ThemedText} from '@/components/ThemedText';
import {useState} from 'react';
import {StyleSheet, Image, TextInput, useColorScheme, View, Button} from 'react-native';
import {placeholder} from '@babel/types';
import { Link } from 'expo-router';
export default function StopSearch() {
	const [searchValue, setSearchValue] = useState('');
	let colorScheme = useColorScheme()

	function submit(busName: string) {

		if (busName == "") {
			return 'M1'
		}
		return busName.replace(' ', '').replace('SBS', '%2B').toUpperCase()
	}
	return (
		<View style={styles.flexbox}>
			<ThemedText >Search for a Stop</ThemedText>
			<TextInput style={colorScheme === 'dark' ? styles.darkModeText : styles.lightSearchbox} placeholder={"Search here..."} placeholderTextColor={colorScheme === 'dark' ? "#fff" : "#000"} onChangeText={setSearchValue} value={searchValue}/>
			<Link style={styles.button} href={{
				pathname: "/stops/[route]",
				params: {route: submit(searchValue)}
			}}>Search</Link>
		</View>
	)
}

const styles = StyleSheet.create({
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
		flexDirection: "row"
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
})