import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import { Ionicons } from '@expo/vector-icons'

const Seat =  React.memo(({ item, onPress }) => {
  let seatComponent;

  switch (item[1].status) {
    case 'AVAILABLE':
      seatComponent = (
        <TouchableOpacity onPress={() => { onPress(item[0]) }} style={[styles.seat, styles.statefree]}>
          <Text style={styles.text}>{item[0]}</Text>
        </TouchableOpacity>
      );
      break;
    case 'SELECTED':
      seatComponent = (
        <TouchableOpacity onPress={() => onPress(item[0])} style={[styles.seat, styles.statechosen]}>
          <Text style={styles.text}>{item[0]}</Text>
        </TouchableOpacity>
      );
      break;
    case 'PENDING':
      seatComponent = (
        <View style={[styles.seat, styles.stateinuse]}>
          <Text style={styles.text}>{item[0]}</Text>
        </View>
      );
      break;
    case 'BOOKED':
      seatComponent = (
        <View style={[styles.seat, styles.statefree]}>
          <Ionicons name="close" size={16} color={COLORS.icon} />
        </View>
      );
      break;
    default:
      seatComponent = null;
  }

  return (
    <View style={styles.container}>
      {seatComponent}
    </View>
  );
})

export default Seat

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: 'bold',
    color: COLORS.white,
    textAlign: "center"
  },
  seat: {
    borderRadius: 8,
    height: 33,
    width: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  statefree: {
    backgroundColor: COLORS.seatFree,
  },
  statechosen: {
    backgroundColor: '#31D7A9'
  },
  stateinuse: {
    backgroundColor: COLORS.primary,
  },
  container: {
    margin: SIZES.medium / 4
  }
})