import {ThemedText} from '@/components/ThemedText';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Link} from 'expo-router';
import {ThemedView} from '@/components/ThemedView';

export default function StopDisplayList(props: { dir: string[]; currentStops: { [x: string]: string | string[]; }; i: string | number; route: any; ids: { [x: string]: any[]; }; }) {
	return (
		<ScrollView>
			{props.dir.map((stop : string, index : number) => {
				// console.log(props.route, props.ids[props.i][index])

				if (props.currentStops[props.i].includes(stop)) {
					return <Link key={index} style={styles.highlight} href={{
						pathname: `/stops/[stop]/[route]`,
						params: {route: props.route, stop: props.ids[props.i][index]}
					}}>{stop}</Link>
				} else {
					return <Link style={styles.text} key={index} href={{
						pathname: `/stops/[stop]/[route]`,
						params: {route: props.route, stop: props.ids[props.i][index]}
					}}>
						{stop}</Link>
				}
			})}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	highlight: {
		backgroundColor: "#ff0000",
	},
	text: {
		color: "#fff"
	}
})
