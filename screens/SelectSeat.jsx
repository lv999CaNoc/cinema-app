import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, CONFIG, SIZES, STYLES } from '../constants'
import { DateTimeBar, Topbar, Symbol, Seat, Button, Loader, } from '../components'
import { LangContext } from '../contexts/LangContext';

import axios from 'axios'
import moment from 'moment'

const SelectSeat = ({ navigation, route }) => {
  const { i18n} = useContext(LangContext); 

  const {item} = route.params;

  const [seats, setSeats] = useState()
  const [selectedSeat, setSelectedSeat] = useState([])
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(()=>{
    const loadSeat = async (scheduleId)=>{
      var url = CONFIG.BASE_URL+"/theater/seat?scheduleId="+scheduleId;
      console.log("Select Seat: "+url);
      
      await axios.get(url)
      .then((response) => {
        setSeats(response.data.data);
      })
      .catch(error => {
        console.log('Error:', error.response.data);
      });
    }
    setLoading(true)
    loadSeat(item.id)
  }, [])

  useEffect(()=>{
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    setLoading(false)
  }, [seats])

  useEffect(()=>{
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    console.log(selectedSeat);
  }, [selectedSeat])

  const handleBookSeat = async () => {
    if (selectedSeat.length === 0) {
      Alert.alert(i18n.t('common.notification'), i18n.t('seat.select_min_1'));
    } else {
      setLoading(true);
      navigation.navigate('Checkout', {item: item, selectedSeat})
    }
  }
    

  const handleSeatRemove = (idToRemove) =>{
    console.log("remove "+idToRemove);
    const indexToRemove = selectedSeat.findIndex(item => item.id === idToRemove);

    if (indexToRemove !== -1) {
      const updatedArray = [...selectedSeat];
      updatedArray.splice(indexToRemove, 1);
      setSelectedSeat(updatedArray);
    }
  }

  const handleSeatAdd = (item) => {
    console.log("add "+item.id);
    if (selectedSeat.length > 8) {
      Alert.alert(i18n.t('common.notification'), i18n.t('seat.select_max_9'));
    }else{
      setSelectedSeat([...selectedSeat, item]);
    }
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} goHome={true} navigation={navigation}
        title={i18n.t('seat._')} subtitle={item.room.name +" - "+ item.room.theater.name} />
      <DateTimeBar date={moment(item.startDate).format('DD/MM/YYYY')} time={moment(item.startDate).format('HH:mm')} />

      <View style={styles.symbols}>
        <Symbol occupied={true} />
        <Symbol available={true} />
        <Symbol inUse={true} />
        <Symbol chosen={true} />
      </View>

      <View style={styles.screen}>
        <Image resizeMode="cover" source={require('../assets/images/Screen.png')} />
      </View>
      {
      loading? (<Loader/>) :(
          <View style={{flex:1}}>
            <View style={styles.seats}>
              <ScrollView horizontal>
                <FlatList data={seats}
                  numColumns={14}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Seat item={item}
                      handleSeatAdd={handleSeatAdd}
                      handleSeatRemove={handleSeatRemove}
                      selectedSeat={selectedSeat} />
                  )}
                />
              </ScrollView>
            </View>
            <View style={styles.button}>
              <Button theme={'primary'} title={i18n.t('symbol._')} onPress={handleBookSeat} />
            </View>
          </View>)
      }
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