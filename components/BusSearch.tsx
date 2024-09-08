import {ThemedText} from '@/components/ThemedText';
import React, {useState} from 'react';
import {StyleSheet, Image, TextInput, useColorScheme, View, Button} from 'react-native';
import {placeholder} from '@babel/types';
import { Link } from 'expo-router';
import {Colors} from '@/constants/Colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function BusSearch() {
	const [searchValue, setSearchValue] = useState('');
	let colorScheme = useColorScheme()



	function submit(busName: string) {

		if (busName == "") {
			return 'M1'
		}
		return busName.toUpperCase().replace(' ', '').replace('SBS', '+')
	}
	return (
		<View style={styles.flex}>
			<TextInput style={[styles.searchbox, colorScheme == 'dark' ? {color: Colors.white} : {color: Colors.black}]} placeholder={"Search here..."} placeholderTextColor={colorScheme === 'dark' ? "#fff" : "#000"} onChangeText={setSearchValue} value={searchValue}/>
			<Link style={styles.link} href={{
				pathname: "/bus/[route]",
				params: {route: submit(searchValue)}
			}}>
				<ThemedText>Search</ThemedText>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	searchButton: {
		flex: 1,
		justifyContent: "center"
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 20,
		gap: 5
	},
	searchbox: {
		borderWidth: 2,
		padding: 10,
		flex: 3,

	},
	link: {
		display: 'flex',
		flex: 1,
		borderWidth: 2,
		borderRadius: 4,
		backgroundColor: Colors.pink,
		justifyContent: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
		alignItems: 'center',
		overflow: 'hidden'

	},

})