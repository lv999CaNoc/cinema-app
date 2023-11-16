import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Topbar } from '../components'

const ShowAll = ({navigation}) => {
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} title={'Show All'}/>
      <Text style={{color: 'white'}}>ShowAll.js (chưa làm)</Text>
    </SafeAreaView>
  )
}

export default ShowAll

const styles = StyleSheet.create({})