import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { STYLES, SIZES, COLORS } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Button, ItemInfo, TearLine, Topbar} from '../components'
import { LangContext } from '../contexts/LangContext'

const Pay = ({navigation}) => {
  const { i18n} = useContext(LangContext);    
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('pay._')}/>
    
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

          <View style={styles.seats}>
            <ItemInfo header={'2 x '+i18n.t('session.seat')} title={'2 x 320.000 VNĐ'} />
            <ItemInfo header={i18n.t('session.total')} title={'640.000 VNĐ'} />
          </View>

        </View>

      <TearLine/>

      <View style={styles.payment}>
        <Button theme={'primary'} small={false} title={i18n.t('common.continue')} 
          onPress={()=> {
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