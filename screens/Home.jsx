import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header, MovieCard } from '../components'
import { COLORS, SIZES, STYLES, CONFIG } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import useFetch from '../hook/useFetch'
import { LangContext } from '../contexts/LangContext'


const Home = ({ navigation }) => {
  const { i18n} = useContext(LangContext);    

  const data = [1, 2, 3, 4, 5, 6]
  const {data: moviesNew, loading: loadNew, error: errNew} = useFetch(CONFIG.BASE_URL+'/movies/newly-release');
  const {data: moviesNowShowing, loading: loadNowShowing, error: errNowShowing} = useFetch(CONFIG.BASE_URL+'/movies/now-showing');
  const {data: movieCommingSoon, loading: loadCommingSoon, error: errCommingSoon} = useFetch(CONFIG.BASE_URL+'/movies/coming-soon');
  const [userData, setUserData] = useState(null)

  if (loadNew || loadNowShowing || loadCommingSoon){
    return (
      <View style={[STYLES.container, STYLES.centerXY]}>
        <ActivityIndicator size="large" color={COLORS.white}/>
      </View>
    );
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Header navigation={navigation}/>

      <ScrollView>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Search')
          }}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentTxt}>{i18n.t('home.search_title')}</Text>
              <Ionicons name="search" size={24} color={COLORS.icon} />
            </View>
          </TouchableOpacity>

          <View style={styles.session}>
            <View style={styles.header}>
              <Text style={styles.title}>{i18n.t('movie.newly')}</Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('ShowAll')
              }}>
                <Ionicons name="grid" size={22} color={COLORS.icon} />
              </TouchableOpacity>
            </View>
            {(errNew || !moviesNew.data) ? (<Text style={{color: 'white'}}>Error</Text>): 
            (<FlatList
              data={moviesNew.data}
              horizontal={true}
              initialNumToRender={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />)}
          </View>
          
          <View style={styles.session}>
            <View style={styles.header}>
              <Text style={styles.title}>{i18n.t('movie.now')}</Text>
              <TouchableOpacity onPress={() => {
                console.log('all press')
                navigation.navigate('ShowAll')
              }}>
                <Ionicons name="grid" size={22} color={COLORS.icon} />
              </TouchableOpacity>
            </View>
            {(errNowShowing || !moviesNowShowing.data) ? (<Text style={{color: 'white'}}>Error</Text>): 
            (<FlatList
              data={moviesNowShowing.data}
              horizontal={true}
              initialNumToRender={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />)}
          </View>
          
          <View style={styles.session}>
            <View style={styles.header}>
              <Text style={styles.title}>{i18n.t('movie.comming')}</Text>
              <TouchableOpacity onPress={() => {
                console.log('all press')
                navigation.navigate('ShowAll')
              }}>
                <Ionicons name="grid" size={22} color={COLORS.icon} />
              </TouchableOpacity>
            </View>
            {(errCommingSoon || !movieCommingSoon.data) ? (<Text style={{color: 'white'}}>Error</Text>): 
            (<FlatList
              data={movieCommingSoon.data}
              horizontal={true}
              initialNumToRender={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />)}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: SIZES.medium
  },
  contentHeader: {
    flexDirection: 'row',
    marginHorizontal: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentTxt: {
    fontFamily: 'bold',
    paddingVertical: SIZES.small,
    fontSize: 22,
    color: COLORS.white
  },
  session:{
    marginVertical: SIZES.xxSmall,
  },
  header: {
    marginHorizontal: SIZES.small,
    paddingTop: SIZES.xSmall,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: COLORS.icon,
    fontSize: 18,
    fontFamily: 'bold'
  },
  container: {
    alignItems: 'center',
    paddingTop: SIZES.medium,
    paddingLeft: SIZES.medium / 2,
  },
  separator: {
    height: SIZES.xSmall,
    width: SIZES.xSmall
  }
})