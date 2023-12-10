import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const Seat = React.memo(({ item, handleSeatAdd, handleSeatRemove, selectedSeat }) => {
  const avaiableSeat = () => (
    <TouchableOpacity onPress={() => { handleSeatAdd({id: item.id, name: item.name}) }} style={[styles.seat, styles.statefree]}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const chosenSeat = () => (
    <TouchableOpacity onPress={() => handleSeatRemove(item.id)} style={[styles.seat, styles.statechosen]}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const pendingSeat = () => (
    <View style={[styles.seat, styles.stateinuse]}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
  
  const bookedSeat = () => (
    <View style={[styles.seat, styles.statefree]}>
      <Ionicons name="close" size={16} color={COLORS.icon} />
    </View>
  );

  const renderSeat = () => {
    switch (item.status) {
      case null:
        return selectedSeat.find(seat => seat.id === item.id) ? chosenSeat() : avaiableSeat();
      case "PENDING":
        return pendingSeat();
      case "COMPLETE":
        return bookedSeat();
      default:
        return null;
    }
  }
  
  return (
    <View style={styles.container}>
      {renderSeat()}
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