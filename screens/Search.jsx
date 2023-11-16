import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { STYLES } from '../constants'
import { Topbar } from '../components'

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={'Search movie'}/>
      <Text style={{color: 'white'}}>Search.js (chưa làm)</Text>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})