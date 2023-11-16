import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES, SIZES, COLORS } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Button, ItemInfo, TearLine, Topbar} from '../components'

const Pay = ({navigation}) => {
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={'Pay for tickets'}/>
    
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

          <View style={styles.seats}>
            <ItemInfo header={'2 x Seat'} title={'2 x 320.000 VNĐ'} />
            <ItemInfo header={'Total'} title={'640.000 VNĐ'} />
          </View>

        </View>

      <TearLine/>

      <View style={styles.payment}>
        <Button theme={'primary'} small={false} title={"Continue"} 
          onPress={()=> {
            console.log('continue')
            navigation.navigate('Ticket')  
          }}/>
      </View>
    </SafeAreaView>
 
  )
}

export default Pay

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
  seats:{
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: SIZES.small
  },
  payment:{
    padding: SIZES.medium
  }
})