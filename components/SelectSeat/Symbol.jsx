import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import { Ionicons } from '@expo/vector-icons'

const Symbol = ({ available, chosen, occupied }) => {
  return (
    <View style={styles.container}>
      {available &&
        <View style={styles.item}>
          <View style={[styles.seat, styles.available]} />
          <Text style={styles.text}>Available</Text>
        </View>}
      {chosen &&
        <View style={styles.item}>
          <View style={[styles.seat, styles.chosen]} />
          <Text style={styles.text}>Chosen</Text>
        </View>}
      {occupied &&
        <View style={styles.item}>
          <View style={[styles.seat, styles.available]}>
            <Ionicons name="close" size={13} color={COLORS.icon} />
          </View>
          <Text style={styles.text}>Occupied</Text>
        </View>}
    </View>
  )
}

export default Symbol

const styles = StyleSheet.create({
  seat: {
    borderRadius: 12,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  available: {
    backgroundColor: COLORS.border,
  },
  chosen: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.white,
    textAlign: "center",
    marginLeft: SIZES.xSmall
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.small
  },
  container: {
    flex: 1,
    alignItems: 'center'
  }
})