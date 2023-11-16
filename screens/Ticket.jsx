import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { Button, ItemInfo, TearLine, Topbar } from '../components'

const Ticket = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar title={'Your ticket'} navigation={navigation} goHome={true} />
      
      <ScrollView>
        <View style={styles.qr}>
          <View style={styles.codeWrapper}>
            <Image style={styles.codeIcon} resizeMode='cover' source={require('../assets/images/QR.png')} />
          </View>
        </View>
        <Text style={styles.description}>Show this code to the gatekeeper at the cinema</Text>

        <TearLine />

        <View style={styles.info}>
          <Text style={styles.title}>Movie name xxx xxxx xxx</Text>
          <View style={styles.details}>
            <ItemInfo header={'Cinema'} title={'Eurasia Cinema7'} desc={'ул. Петрова, д.24, ТЦ "Евразия"'} />
            <ItemInfo header={'Date'} title={'11/11/2023'} />
            <ItemInfo header={'Time'} title={'14:40'} />
            <ItemInfo header={'Room'} title={'P104'} />
            <ItemInfo header={'Seats'} title={'A3'} />
            <ItemInfo header={'Const'} title={'320.000 VNĐ'} />
          </View>
        </View>

        <View style={styles.controls}>
          <View style={styles.control}>
            <Button theme={'secondary'} title={'Refund'} onPress={()=> console.log('refund')}/>
          </View>
          <View style={styles.control}>
            <Button theme={'primary'} title={'Send'} onPress={()=> console.log('send')}/>
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