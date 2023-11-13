import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { DateTimeBar, Topbar, Symbol, Seat, Button, } from '../components'

const seatsData = [
  { id: 'A1', status: 'SELECTED' },
  { id: 'A2', status: 'BOOKED' },
  { id: 'A3', status: 'PENDING' },
  { id: 'A4', status: 'AVAILABLE' },
  { id: 'A5', status: 'AVAILABLE' },
  { id: 'A6', status: 'AVAILABLE' },
  { id: 'A7', status: 'PENDING' },
  { id: 'A8', status: 'AVAILABLE' },
  { id: 'A9', status: 'AVAILABLE' },
  { id: 'A10', status: 'AVAILABLE' },
  { id: 'A11', status: 'AVAILABLE' },
  { id: 'A12', status: 'AVAILABLE' },
  { id: 'A13', status: 'AVAILABLE' },
  { id: 'A14', status: 'AVAILABLE' },
  { id: 'B1', status: 'SELECTED' },
  { id: 'B2', status: 'BOOKED' },
  { id: 'B3', status: 'PENDING' },
  { id: 'B4', status: 'AVAILABLE' },
  { id: 'B5', status: 'AVAILABLE' },
  { id: 'B6', status: 'AVAILABLE' },
  { id: 'B7', status: 'PENDING' },
  { id: 'B8', status: 'AVAILABLE' },
  { id: 'B9', status: 'AVAILABLE' },
  { id: 'B10', status: 'AVAILABLE' },
  { id: 'B11', status: 'AVAILABLE' },
  { id: 'B12', status: 'AVAILABLE' },
  { id: 'B13', status: 'AVAILABLE' },
  { id: 'B14', status: 'AVAILABLE' },
  { id: 'C1', status: 'SELECTED' },
  { id: 'C2', status: 'BOOKED' },
  { id: 'C3', status: 'PENDING' },
  { id: 'C4', status: 'AVAILABLE' },
  { id: 'C5', status: 'AVAILABLE' },
  { id: 'C6', status: 'AVAILABLE' },
  { id: 'C7', status: 'PENDING' },
  { id: 'C8', status: 'AVAILABLE' },
  { id: 'C9', status: 'AVAILABLE' },
  { id: 'C10', status: 'AVAILABLE' },
  { id: 'C11', status: 'AVAILABLE' },
  { id: 'C12', status: 'AVAILABLE' },
  { id: 'C13', status: 'AVAILABLE' },
  { id: 'C14', status: 'AVAILABLE' },

];

const SelectSeat = ({ navigation }) => {
  const seatData = {};
  seatsData.forEach((seat) => {
    // Chuyển dạng JSON thành dạng key: value
    seatData[seat.id] = { status: seat.status };
  });

  const [seats, setSeats] = useState(seatData);

  const handleBookSeat = () => {
    const selectedSeats = Object.entries(seats)
      .filter(([id, seat]) => seat.status === 'SELECTED')
      .map(([id]) => id);

    if (selectedSeats.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một ghế.');
    } else if (selectedSeats.length > 3) {
      Alert.alert('Thông báo', 'Bạn không được chọn quá 3 ghế.');
    } else {
      // Gửi thông tin về các ghế được chọn
      console.log('Selected Seats:', selectedSeats);
    }
  }

  const handleSeatPress = (id) => {
    setSeats((prevSeats) => {
      const updatedSeats = { ...prevSeats };
      if (updatedSeats[id].status === 'AVAILABLE') {
        updatedSeats[id].status = 'SELECTED';
      } else if (updatedSeats[id].status === 'SELECTED') {
        updatedSeats[id].status = 'AVAILABLE';
      }
      return updatedSeats;
    });
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} goHome={true} navigation={navigation}
        title={'Select seat'} subtitle={'xxxxxxxxxxxxxxxxxxx'} />
      <DateTimeBar date={"11/11/2023"} time={"15:10"} />

      <View style={styles.symbols}>
        <Symbol occupied={true} />
        <Symbol available={true} />
        <Symbol inUse={true} />
        <Symbol chosen={true} />
      </View>

      <View style={styles.screen}>
        <Image resizeMode="cover" source={require('../assets/images/Screen.png')} />
      </View>

      <View style={styles.seats}>
        <ScrollView horizontal>
          <FlatList data={Object.entries(seats)}
            numColumns={14}
            keyExtractor={([id]) => id}
            renderItem={({ item }) => (
              <Seat item={item} onPress={handleSeatPress} />
            )}
          />
        </ScrollView>
      </View>

      <View style={styles.button}>
        <Button theme={'primary'} title="Booking tickets" onPress={handleBookSeat} />
      </View>
    </SafeAreaView>
  )
}

export default SelectSeat

const styles = StyleSheet.create({
  symbols: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    paddingHorizontal: SIZES.medium,
    justifyContent: 'space-evenly'
  },
  screen: {
    paddingTop: SIZES.medium,
    backgroundColor: COLORS.background,
    alignItems: 'center'
  },
  seats: {
    flex: 1,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
  }
})