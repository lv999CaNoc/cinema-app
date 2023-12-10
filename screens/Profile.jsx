import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ItemInfo, Loader, MovieTile, Topbar } from '../components'
import { COLORS, CONFIG, SIZES, STYLES } from '../constants'
import { AuthContext } from '../contexts/AuthContext'
import { LangContext } from '../contexts/LangContext'

const Profile = (props) => {
  const { i18n } = useContext(LangContext);
  const { config } = useContext(AuthContext);
  const { navigation } = props

  const [user, setUser] = useState()  
  const [bills, setBills] = useState()  
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(()=>{
    const loadProfile = async()=>{
      const url = CONFIG.BASE_URL+'/bill';
      console.log("GET "+url);
  
      await axios.get(url, config)
        .then((response) => {
          const data = response.data.data;
          setUser(data[0].user)
          setBills(data.map(item => item).reverse())
        })
        .catch(error => {
          Alert.alert(i18n.t('common.notification'), i18n.t('error._'),);
          console.log('Error:', error.response.data);
        });
    }
    setLoading(true)
    loadProfile()
  }, [])

  useEffect(()=>{
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    setLoading(false)
  }, [user])

  const renderContent = () => {
    return (bills.length !== 0) ? (
      <View style={styles.history}>
        <Text style={styles.contentTitle}>{i18n.t('profile.pay_history')}</Text>
        <FlatList
              data={bills}
              initialNumToRender={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieTile bill={item} navigation={navigation}/>}
            />
      </View>
    ) :
      (<View style={styles.history}>
        <Text style={styles.contentTitle}>{i18n.t('profile.pay_history')}</Text>
        <View style={styles.placeholder}>
          <Image resizeMode='cover' source={require('../assets/images/Illustration.png')} />
          <Text style={styles.placeholderTxt}>{i18n.t('profile.pay_history_msg')}</Text>
        </View>
      </View>)
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} logout={true} title={i18n.t('profile._')} navigation={navigation} />
      {
        loading ? <Loader /> : (
          <View style={styles.contents}>
            <View style={styles.content}>
              <ItemInfo header={i18n.t('common.username')} title={user.username} />
              <ItemInfo header={'Email'} title={user.email} />
              <Button theme={'primary'} small={true} title={i18n.t('profile.update')} onPress={() => console.log('Update profile')} />
            </View>
            {
              renderContent()
            }
          </View>
        )
      }
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.small
  },
  content: {
    paddingTop: SIZES.medium
  },
  history: {
    flex:1,
    paddingTop: SIZES.medium
  },
  contentTitle: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.icon,
    paddingBottom: SIZES.xSmall,
    paddingTop: SIZES.xSmall,
    borderTopWidth: 2.2,
    borderColor: COLORS.background2
  },
  placeholder: {
    flex: 1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderTxt: {
    color: COLORS.icon,
    marginTop: SIZES.small,
    fontFamily: 'regular'
  },

})