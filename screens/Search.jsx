import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { STYLES } from '../constants'
import { Topbar } from '../components'

import i18n from '../lib/I18n'

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('home.search_title')}/>
      <Text style={{color: 'white'}}>Search.js (chưa làm)</Text>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})