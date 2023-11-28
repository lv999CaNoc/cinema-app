import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES } from '../constants'
import { Button, ItemInfo, MovieTile, Payment, Topbar } from '../components'
import i18n from '../lib/I18n'

const Profile = (props) => {
  const {navigation} = props
  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} logout={true} title={i18n.t('profile._')} navigation={navigation}/>
      
      <ScrollView style={styles.contents}>
        <View style={styles.content}>
          <ItemInfo header={i18n.t('common.username')} title={'username'} />
          <ItemInfo header={'Email'} title={'username@gmail.com'} />
              <Button theme={'primary'} small={true} title={i18n.t('profile.update')} onPress={()=> console.log('Update profile')}/>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.contentTitle}>{i18n.t('profile.saved_cart')}</Text>
          
          <Button theme={'secondary'} small={true} title={i18n.t('profile.add_new_cart')} onPress={()=> console.log('Add new card')}/>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.contentTitle}>{i18n.t('profile.pay_history')}</Text>
          
          <MovieTile/>
          <MovieTile/>
          <MovieTile/>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentTitle}>{i18n.t('profile.pay_history')}</Text>
          <View style={styles.placeholder}>
            <Image resizeMode='cover' source={require('../assets/images/Illustration.png')}/>
            <Text style={styles.placeholderTxt}>{i18n.t('profile.pay_history_msg')}</Text>
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
    paddingBottom: SIZES.xSmall,
    paddingTop: SIZES.xSmall,
    borderTopWidth: 2.2,
    borderColor: COLORS.background2
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