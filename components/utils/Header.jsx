import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../constants'
import Button from './Button'
import Language from '../modals/Language'
import Modal from 'react-native-modal';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react'

import i18n from '../../lib/I18n'

const Header = ({ navigation}) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [isLangModalVisible, setLangModalVisible] = useState(false);
  const toggleLangModal = () => {
    setLangModalVisible(!isLangModalVisible);
  };

  return (
    <View style={styles.header}>
      <Image
        contentFit={'cover'}
        source={require('../../assets/images/logo.png')} />

      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={() => { }}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../../assets/icons/Location.png")}
          />
          <Text style={styles.text}>
            {i18n.t('common.location')}
          </Text>
        </Pressable>
        <TouchableOpacity style={styles.control} onPress={toggleLangModal}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../../assets/icons/Language.png")}
          />
          <Text style={styles.text}>{i18n.t('common.select_lang')}</Text>
        </TouchableOpacity>
        <Modal
          isVisible={isLangModalVisible}
          animationIn="zoomIn"
          animationOut="zoomOut"
          onBackdropPress={toggleLangModal}
          backdropOpacity={0.8}
        >
          <Language onHide={()=>toggleLangModal()}/>
        </Modal>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {!isLoggedIn ? (
          <Button theme={'primary'} small={true} title={'Log in'} onPress={() => navigation.navigate('Login')}/>)
        :(<Button theme={'primary'} small={true} title={'Profile'} onPress={() => navigation.navigate('Profile')} />)}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
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
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.xSmall
  },
  text: {
    fontFamily: 'bold',
    fontSize: 14,
    color: COLORS.white,
    paddingStart: SIZES.xxSmall,
  }
});