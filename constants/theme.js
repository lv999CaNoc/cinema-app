
import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: "#FF8036",
 
  background: '#1A2232',
  background2: '#1d273a', // ##3b4d73

  white: "#FFFFFF",
  icon: '#637394',
  border: 'rgba(109, 158, 255, 0.1)',
  seatFree: '#253554',
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
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'    
  }
})
export { COLORS, SIZES , SHADOWS , STYLES};
