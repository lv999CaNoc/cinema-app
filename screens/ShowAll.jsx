import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { STYLES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Topbar } from '../components'
import { LangContext } from '../contexts/LangContext'

const ShowAll = ({navigation}) => {
  const { i18n} = useContext(LangContext);    

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('common.show_all')}/>
      <Text style={{color: 'white'}}>ShowAll.js (chưa làm)</Text>
    </SafeAreaView>
  )
}

export default ShowAll

const styles = StyleSheet.create({})