import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header, MovieCard } from '../components'
import { COLORS, SIZES, STYLES } from '../constants'
import { Ionicons } from '@expo/vector-icons'

const Home = ({ navigation }) => {
  const data = [1, 2, 3, 4, 5, 6]

  return (
    <SafeAreaView style={STYLES.container}>
      <Header navigation={navigation} />

      <ScrollView>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => console.log('search press')}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentTxt}>Search movie</Text>
              <Ionicons name="search" size={24} color={COLORS.icon} />
            </View>
          </TouchableOpacity>

          <View style={styles.session}>
            <View style={styles.header}>
              <Text style={styles.title}>Popular Movies</Text>
              <TouchableOpacity onPress={() => console.log('all press')}>
                <Ionicons name="grid" size={24} color={COLORS.icon} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              horizontal={true}
              // keyExtractor={(item) => item._id}
              renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
          
          <View style={styles.session}>
            <View style={styles.header}>
              <Text style={styles.title}>Now Showing</Text>
              <TouchableOpacity onPress={() => console.log('all press')}>
                <Ionicons name="grid" size={24} color={COLORS.icon} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              horizontal={true}
              // keyExtractor={(item) => item._id}
              renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
          
          <View style={styles.session}>
            <View style={styles.header}>
              <Text style={styles.title}>Coming Soon</Text>
              <TouchableOpacity onPress={() => console.log('all press')}>
                <Ionicons name="grid" size={24} color={COLORS.icon} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              horizontal={true}
              // keyExtractor={(item) => item._id}
              renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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