import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Header, MovieCard} from '../components'
import { COLORS, SIZES, STYLES } from '../constants'
import { Ionicons } from '@expo/vector-icons'

const Home = ({navigation}) => {
  const data = [1,2,3,4, 5, 6]

  return (
    <SafeAreaView style={STYLES.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTxt}>Now in cinema</Text>
          <TouchableOpacity onPress={()=>console.log('search press')}>
            <Ionicons name="search" size={24} color={COLORS.icon}/>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <MovieCard item={item} navigation={navigation}/>}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  content:{
    backgroundColor: COLORS.background,
  },
  contentHeader:{
    flexDirection: 'row',
    marginHorizontal: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  contentTxt:{
    fontFamily: 'bold',
    paddingVertical: SIZES.small,
    fontSize: 22,
    color: COLORS.white
  },
  container:{
    alignItems: 'center',
    paddingTop: SIZES.medium,
    paddingLeft: SIZES.medium/2,
  },
  separator:{
    height: SIZES.medium,
  }
})