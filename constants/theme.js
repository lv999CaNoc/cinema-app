
import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: "#FF8036",
 
  background: '#1A2232',
  background2: '#1d273a', // #1C2536

  white: "#FFFFFF",
  icon: '#637394',
  border: 'rgba(109, 158, 255, 0.1)',
  // 
  secondary: "#DDF0FF",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  offwhite: "#F3F4F8",
  black: "#000000",
  red: "#e81e4d",
  green: " #00C135",
  lightWhite: "#FAFAFC",
};


const SIZES = {
  xxSmall: 6,
  xSmall: 9,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width
};


const SHADOWS = {
  small: {
    shadowColor: "#9DB2D621",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#9DB2D621",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const STYLES = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background2, 
    flex: 1
  }
})
export { COLORS, SIZES , SHADOWS , STYLES};
