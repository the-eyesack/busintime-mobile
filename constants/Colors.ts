/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import {useColorScheme} from 'react-native';

const tintColorLight = '#B6465F';
const tintColorDark = '#B6465F';

export const Colors = {
  light: {
    text: '#2E2836',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#2E2836',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  highlight: '#FB6107',
  pink: '#B6465F',
  yellow: '#C2A83E',
  black: '#2E2836',
  white: '#fff',
  colorScheme: useColorScheme()

};
