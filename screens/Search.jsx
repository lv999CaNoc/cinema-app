import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { STYLES } from '../constants'
import { Topbar } from '../components'
import { LangContext } from '../contexts/LangContext'

const Search = ({navigation}) => {
  const { i18n} = useContext(LangContext);    

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={i18n.t('home.search_title')}/>
      <Text style={{color: 'white'}}>Search.js (chưa làm)</Text>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})