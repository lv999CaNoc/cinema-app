import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from '../../constants';
import { Ionicons } from "@expo/vector-icons";

const CinemaHeading = () => {
  return (
    <TouchableOpacity style={styles.cinemaHeading}
      onPress={() => console.log('Cinema Heading press')}  
    >
      <View style={[styles.title, styles.titleFlexBox]}>
        <Text style={styles.title1}>Eurasia Cinema7</Text>
        <View style={[styles.distance, styles.titleFlexBox]}>
          <Ionicons name="location-sharp" size={18} color={COLORS.icon} />
          <Text style={[styles.km, styles.kmTypo]}>1.5km</Text>
        </View>
      </View>
      <Text style={[styles.address, styles.kmTypo]}>ул. Петрова, д.24, ТЦ "Евразия"</Text>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
  titleFlexBox: {
    alignItems: "center",
    flexDirection: "row"
  },
  kmTypo: {
    color: COLORS.icon,
    fontSize: 14,
    textAlign: "left",
    fontFamily: 'regular'
  },
  title1: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.white,
    textAlign: "left",
    fontFamily: 'bold',
    flex: 1
  },
  km: {
    fontFamily: 'bold',
    marginLeft: 4
  },
  distance: {
    marginLeft: 16
  },
  title: {
    alignSelf: "stretch"
  },
  address: {
    lineHeight: 18,
    marginTop: 4,
    alignSelf: "stretch"
  },
  cinemaHeading: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(109, 158, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  }
});
export default CinemaHeading;