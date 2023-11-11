import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({style, small, icon, loader}) => {
  return (
    <TouchableOpacity 
        onPress={()=> console.log('button press')}
    >

    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})