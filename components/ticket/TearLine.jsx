import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TearLine = () => {

  const renderEclipse = ()=>{
    let eclipse = []
    for (let i=0; i<16; i++){
      eclipse.push(
        <Image key={i} resizeMode='cover' source={require('../../assets/icons/Ellipse.png')}/>
      )
    } 
    return eclipse;
  }

  return (
    <View style={styles.tearLine}>
      <Image resizeMode='cover' source={require('../../assets/icons/EllipseLeft.png')}/>
      {renderEclipse()}
      <Image resizeMode='cover' source={require('../../assets/icons/EllipseRight.png')}/>
    </View>
  )
}

export default TearLine

const styles = StyleSheet.create({
  tearLine: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
})