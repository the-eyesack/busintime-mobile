import {ThemedText} from '@/components/ThemedText';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {Link} from 'expo-router';
import {ThemedView} from '@/components/ThemedView';
import {Colors} from '@/constants/Colors';

export default function StopDisplayList(props: { dir: string[]; currentStops: { [x: string]: string | string[]; }; i: string | number; route: any; ids: { [x: string]: any[]; }; }) {
	return (
		<ThemedView>
		<ScrollView
			contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}
		>

			<View style={styles.arrowContainer}>
				<Text style={[styles.line, {top: -20}]}/>
				<View style={styles.arrow}/>
				<Text style={styles.line}/>
			</View>
			<View style={styles.container}>
				{props.dir.map((stop : string, index : number) => {
					if (props.currentStops[props.i].includes(stop)) {
						return <View style={styles.textContainer}>
							<Text style={styles.dotHighlight}/>
							<Text style={styles.line}/>
							<Link key={index} href={{
								pathname: `/stops/[stop]/[route]`,
								params: {route: props.route, stop: props.ids[props.i][index]}
							}}><ThemedText>{stop}</ThemedText></Link>
						</View>
					} else {
						return <View style={styles.textContainer}>
							<Text style={styles.dot}/>
							<Text style={styles.line}/>
							<Link key={index} href={{
								pathname: `/stops/[stop]/[route]`,
								params: {route: props.route, stop: props.ids[props.i][index]}
							}}><ThemedText>{stop}</ThemedText></Link>
						</View>
					}
				})}

			</View>
			<View style={[styles.arrowContainer, {marginTop: 80}]}>
				<View style={styles.arrow}/>
			</View>
		</ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	arrowContainer: {
		marginLeft: 20,
		marginTop: 10
	},
	arrow: {
		borderTopWidth: 10,
		borderLeftWidth: 10,
		borderColor: 'transparent',
		borderTopColor: 'black',
		borderRightWidth: 10,
		width: 0,
		height: 0,
		marginLeft: -2

	},
	line: {
		borderWidth: 1,
		height: 100,
		width: 2,
		position: "absolute",
		left: 7,
		top: 10,
		zIndex: 0,
	},
	text: {
		color: "#fff"
	},
	container: {
		flex: 1,
		marginLeft: 20,
		gap: 10
	},
	dot: {
		borderWidth: 1,
		padding: 2,
		width: 16,
		height: 16,
		borderRadius: 16/2,
		zIndex: 1,
		backgroundColor: Colors.yellow,
		overflow: 'hidden',

	},
	dotHighlight: {
		borderWidth: 1,
		padding: 2,
		width: 15,
		height: 15,
		borderRadius: 15/2,
		backgroundColor: Colors.highlight,
		overflow: 'hidden',
		zIndex: 1,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center'
	}
})
