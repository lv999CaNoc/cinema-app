import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Topbar } from '../components'
import i18n from '../lib/I18n'

const ShowAll = ({navigation}) => {
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('common.show_all')}/>
      <Text style={{color: 'white'}}>ShowAll.js (chưa làm)</Text>
    </SafeAreaView>
  )
}

export default ShowAll

const styles = StyleSheet.create({})