import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { About, Button, Session, Tab, Topbar, Trailer } from '../components'

const Movie = ({ navigation, route }) => {
  // const {movie} = route.params
  const [tab1Active, setTab1Active] = useState(false)

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} right={false} title="Movie" navigation={navigation} />
      <View style={{ flexDirection: 'row' }}>
        <Tab current={tab1Active} title="About" onPress={() => setTab1Active(true)} />
        <Tab current={!tab1Active} title="Sessions" onPress={() => setTab1Active(false)} />
      </View>

      {tab1Active ?
        (<About />) :
        (<Session />)}
    </SafeAreaView>
  )
}

export default Movie

const styles = StyleSheet.create({

})