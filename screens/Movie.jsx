import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { About, Session, Tab, Topbar } from '../components'
import { STYLES } from '../constants'
import { LangContext } from '../contexts/LangContext'

const Movie = ({ navigation, route }) => {
  const { i18n} = useContext(LangContext);    
  const {movie, lineCategories} = route.params
  const [tab1Active, setTab1Active] = useState(true)

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} right={false} title={i18n.t('movie._')} navigation={navigation} />
      <View style={{ flexDirection: 'row' }}>
        <Tab current={tab1Active} title={i18n.t('movie.about')} onPress={() => setTab1Active(true)} />
        <Tab current={!tab1Active} title={i18n.t('movie.session')}  onPress={() => setTab1Active(false)} />
      </View>

      {tab1Active ?
        (<About onSelectMovie={()=>setTab1Active(false)} item={movie} lineCategories={lineCategories}/>) :
        (<Session movieId={movie.id}/>)}
    </SafeAreaView>
  )
}

export default Movie