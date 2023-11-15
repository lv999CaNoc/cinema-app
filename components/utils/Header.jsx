import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants'
import Button from './Button'
import Language from '../modals/Language'
import Modal from 'react-native-modal';

const Header = ({ navigation }) => {
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
            Ha Noi
          </Text>
        </Pressable>
        <TouchableOpacity style={styles.control} onPress={toggleLangModal}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../../assets/icons/Language.png")}
          />
          <Text style={styles.text}>Eng</Text>
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
        <Button theme={'primary'} small={true} title={'Log in'} onPress={() => navigation.navigate('Login')} />
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