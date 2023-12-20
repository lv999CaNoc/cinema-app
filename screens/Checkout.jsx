import moment from 'moment'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ItemInfo, Loader, TearLine, Topbar } from '../components'
import { COLORS, CONFIG, SIZES, STYLES } from '../constants'
import axios from 'axios'
import { LangContext } from '../contexts/LangContext'
import { AuthContext } from '../contexts/AuthContext'

const Checkout = ({ navigation, route }) => {
  const { i18n } = useContext(LangContext);
  const { config } = useContext(AuthContext);

  const { item, selectedSeat } = route.params;
  const [loading, setLoading] = useState(false);
  const numOfSeat = selectedSeat.length;

  const handlePayment = async()=>{
    setLoading(true)
    const data = {
      scheduleId: item.id,
      listSeatIds: selectedSeat.map(seat=>seat.id),
    }
    var url = CONFIG.BASE_URL + "/bill";
    console.log("Create bill: [Checkout.js]: " + url);

    await axios.post(url, data, config)
      .then((response) => {
        navigation.navigate("Payment", { item: response.data.data, selectedSeat })
        setLoading(false)
      })
      .catch(error => {
        Alert.alert(i18n.t('common.notification'), i18n.t('error._'));
        console.log('Error:', error.response.data);
      });
  }

  return (

    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('pay._')} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.movie.title}</Text>
        <View style={styles.details}>
          <ItemInfo header={i18n.t('session.cinema')} title={item.room.theater.name}
            desc={item.room.theater.address} />
          <ItemInfo header={i18n.t('session.date')} title={moment(item.startDate).format("DD/MM/YYYY")} />
          <ItemInfo header={i18n.t('sort.time')} title={moment(item.startDate).format("HH:mm")} />
          <ItemInfo header={i18n.t('session.room')} title={item.room.name} />
          <ItemInfo header={i18n.t('session.seats')} title={selectedSeat.map(seat => seat.name).join(', ')} />
          <ItemInfo header={i18n.t('session.cost')} title={item.price + " VND"} />
        </View>

        <View style={styles.seats}>
          <ItemInfo header={numOfSeat + ' x ' + i18n.t('session.seat')} title={numOfSeat + ' x ' + item.price + ' VND'} />
          <ItemInfo header={i18n.t('session.total')} title={numOfSeat * item.price + ' VND'} />
        </View>

      </View>

      <TearLine />

      {
      loading ? <Loader /> :
        (<View style={styles.payment}>
          <Button theme={'primary'} paypal={true} small={false} title={i18n.t('pay._')}
            onPress={handlePayment} />
        </View>)
      }
    </SafeAreaView>
    
  )
}

export default Checkout

const styles = StyleSheet.create({
  info: {
    paddingHorizontal: SIZES.medium
  },
  title: {
    fontFamily: 'bold',
    fontSize: 18,
    color: COLORS.white,
    paddingVertical: SIZES.medium
  },
  seats: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: SIZES.small
  },
  payment: {
    padding: SIZES.medium
  }
})