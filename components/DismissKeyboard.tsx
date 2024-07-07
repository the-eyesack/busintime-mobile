import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

// @ts-ignore
export default function DismissKeyboard({children}) {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

				{children}

		</TouchableWithoutFeedback>)
}