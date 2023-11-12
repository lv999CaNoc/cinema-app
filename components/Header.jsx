import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import Button from './Button'

const Header = () => {
  return (
    <View style={styles.header}>
      <Image 
        contentFit={'cover'}
        source={require('../assets/images/logo.png')} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={() => { }}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/icons/Location.png")}
          />
          <Text style={styles.text}>
            Hà Nội
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={() => { }}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/icons/Language.png")}
          />
          <Text style={styles.text}>Vie</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{flexDirection: 'row'}}>
        <Button theme={'primary'} small={true} title={'Log in'} onPress={()=>console.log('login in press')}/>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header:{
      width: SIZES.width,
      height: 65,
      flexDirection: 'row',
      backgroundColor: COLORS.background2,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: SIZES.medium
  },
  controls: {
      alignItems: 'center',
      flexDirection: 'row'
  },
  control:{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.xSmall
  },
  text:{
      fontFamily: 'bold',
      fontSize: 14,
      color: COLORS.white,
      paddingStart: SIZES.xxSmall,
  }
});