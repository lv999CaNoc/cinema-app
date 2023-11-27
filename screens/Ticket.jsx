import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { Button, ItemInfo, TearLine, Topbar } from '../components'
import i18n from '../lib/I18n'

const Ticket = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar title={i18n.t('ticket._')} navigation={navigation} goHome={true} left={true}/>
      
      <ScrollView>
        <View style={styles.qr}>
          <View style={styles.codeWrapper}>
            <Image style={styles.codeIcon} resizeMode='cover' source={require('../assets/images/QR.png')} />
          </View>
        </View>
        <Text style={styles.description}>{i18n.t('ticket.msg')}</Text>

        <TearLine />

        <View style={styles.info}>
          <Text style={styles.title}>Movie name xxx xxxx xxx</Text>
          <View style={styles.details}>
            <ItemInfo header={i18n.t('session.cinema')} title={'Eurasia Cinema7'} desc={'ул. Петрова, д.24, ТЦ "Евразия"'} />
            <ItemInfo header={i18n.t('session.date')} title={'11/11/2023'} />
            <ItemInfo header={i18n.t('sort.time')} title={'14:40'} />
            <ItemInfo header={i18n.t('session.room')} title={'P104'} />
            <ItemInfo header={i18n.t('session.seats')} title={'A3'} />
            <ItemInfo header={i18n.t('session.cost')} title={'320.000 VNĐ'} />
          </View>
        </View>

        <View style={styles.controls}>
          <View style={styles.control}>
            <Button theme={'secondary'} title={i18n.t('common.refund')} onPress={()=> console.log('refund')}/>
          </View>
          <View style={styles.control}>
            <Button theme={'primary'} title={i18n.t('common.send')} onPress={()=> console.log('send')}/>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Ticket

const styles = StyleSheet.create({
  qr: {
    paddingTop: SIZES.xxSmall,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeWrapper: {
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: SIZES.small,
  },
  codeIcon: {
    width: 240,
    height: 240,
  },
  description: {
    fontFamily: 'regular',
    paddingVertical: SIZES.medium,
    textAlign: 'center',
    color: COLORS.icon
  },
  info: {
    paddingHorizontal: SIZES.medium
  },
  title: {
    fontFamily: 'bold',
    fontSize: 18,
    color: COLORS.white,
    paddingVertical: SIZES.medium
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.medium,
  },
  control: {
    width: '47%'
  },

})