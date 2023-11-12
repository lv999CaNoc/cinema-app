import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {COLORS} from '../constants'
import { Ionicons } from '@expo/vector-icons';

const Button = ({theme, small, icon, title, onPress}) => {
  return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.button, (theme === 'primary') ? styles.buttonPrimary: ((theme === 'secondary')? styles.buttonSecondary : ''), small ? styles.small : styles.big]}
      >
        {icon ? (<Ionicons name="search" size={24} color="white" style={{ paddingEnd: 8 }} />) : ('')}
        {small ? (
          <Text style={[styles.text, styles.smallText]}>{title}</Text>
        ) : (
          <Text style={[styles.text, styles.bigText]}>{title}</Text>
        )}
      </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonPrimary:{
    backgroundColor: COLORS.primary,
  },
  buttonSecondary:{
    borderWidth: 1,
    borderColor: '#6D9EFF1A'
  },
  big:{
    height: 54,
    paddingHorizontal: 24
  },
  small:{
    height: 38,
    paddingHorizontal: 16
  },
  text:{
    fontFamily: 'bold',
    color: COLORS.white
  },
  bigText:{
    fontSize: 17
  },
  smallText:{
    fontSize: 14
  }
})