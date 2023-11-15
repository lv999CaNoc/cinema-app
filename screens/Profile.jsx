import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { Button, ItemInfo, MovieTile, Payment, Topbar } from '../components'

const Profile = (props) => {
  const {navigation} = props
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} logout={true} onLogout={()=>console.log('logout')} title={'Profile'}/>
      
      <ScrollView style={styles.contents}>
        <View style={styles.content}>
          <ItemInfo header={'Username'} title={'username'} />
          <ItemInfo header={'Email'} title={'username@gmail.com'} />
              <Button theme={'primary'} small={true} title={'Update profile'} onPress={()=> console.log('Add new card')}/>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Saved cards</Text>
          
          <Button theme={'secondary'} small={true} title={'Add new card'} onPress={()=> console.log('Add new card')}/>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Payment history</Text>
          
          <MovieTile/>
          <MovieTile/>
          <MovieTile/>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentTitle}>Payment history</Text>
          <View style={styles.placeholder}>
            <Image resizeMode='cover' source={require('../assets/images/Illustration.png')}/>
            <Text style={styles.placeholderTxt}>You haven't bought tickets yet</Text>
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  contents:{
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.medium
  },
  content:{
    flex: 1,
    paddingTop: SIZES.medium
  },
  contentTitle:{
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.icon,
    paddingBottom: SIZES.xSmall
  },
  placeholder:{
    flex:1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderTxt:{
    color: COLORS.icon,
    marginTop: SIZES.small,
    fontFamily: 'regular'
  },

})