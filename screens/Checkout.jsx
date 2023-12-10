import moment from 'moment'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ItemInfo, TearLine, Topbar } from '../components'
import { COLORS, SIZES, STYLES } from '../constants'
import { LangContext } from '../contexts/LangContext'

const Checkout = ({ navigation, route }) => {
  const { i18n } = useContext(LangContext);

  const { item, selectedSeat } = route.params;
  const numOfSeat = selectedSeat.length;

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('pay._')} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.schedule.movie.title}</Text>
        <View style={styles.details}>
          <ItemInfo header={i18n.t('session.cinema')} title={item.schedule.room.theater.name}
            desc={item.schedule.room.theater.address} />
          <ItemInfo header={i18n.t('session.date')} title={moment(item.schedule.startDate).format("DD/MM/YYYY")} />
          <ItemInfo header={i18n.t('sort.time')} title={moment(item.schedule.startDate).format("HH:mm")} />
          <ItemInfo header={i18n.t('session.room')} title={item.schedule.room.name} />
          <ItemInfo header={i18n.t('session.seats')} title={selectedSeat.map(seat => seat.name).join(', ')} />
          <ItemInfo header={i18n.t('session.cost')} title={item.schedule.price + " VND"} />
        </View>

        <View style={styles.seats}>
          <ItemInfo header={numOfSeat + ' x ' + i18n.t('session.seat')} title={numOfSeat + ' x ' + item.schedule.price + ' VND'} />
          <ItemInfo header={i18n.t('session.total')} title={numOfSeat * item.schedule.price + ' VND'} />
        </View>

      </View>

      <TearLine />

      <View style={styles.payment}>
        <Button theme={'primary'} paypal={true} small={false} title={i18n.t('pay._')}
          onPress={() => {
            navigation.navigate("Payment", { item, selectedSeat })
          }} />
      </View>
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