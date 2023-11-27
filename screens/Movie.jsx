import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { About, Button, Session, Tab, Topbar, Trailer } from '../components'
import i18n from '../lib/I18n'

const Movie = ({ navigation, route }) => {
  const {movie} = route.params
  const [tab1Active, setTab1Active] = useState(true)

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} right={false} title={i18n.t('movie._')} navigation={navigation} />
      <View style={{ flexDirection: 'row' }}>
        <Tab current={tab1Active} title={i18n.t('movie.about')} onPress={() => setTab1Active(true)} />
        <Tab current={!tab1Active} title={i18n.t('movie.session')}  onPress={() => setTab1Active(false)} />
      </View>

      {tab1Active ?
        (<About onSelectMovie={()=>setTab1Active(false)} item={movie}/>) :
        (<Session />)}
    </SafeAreaView>
  )
}

export default Movie