import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: 'red'}}>
        <Text style={styles.text}>Home</Text>
      </View>
    </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
  text:{
    fontSize: 24,
    fontFamily: 'bold'
  }
})