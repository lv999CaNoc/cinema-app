import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

const Tab = ({current, title, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.tab, (current? styles.hoverBtn : '')]}>
            <Text style={[styles.text, (current? styles.hover : '')]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Tab

const styles = StyleSheet.create({
    tab:{
        flex: 1,
        height: 46,
        marginBottom: SIZES.xxSmall,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: 'rgba(109, 158, 255, 0.2)',
        alignSelf: "stretch",
    },
    text:{
        fontFamily: 'bold',
        letterSpacing: 0.8,
        color: COLORS.icon,
        fontSize: 16,
    },
    hover: {
        color: COLORS.primary,
        textShadowColor: "rgba(255, 128, 54, 0.5)",
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
    },
    hoverBtn: {
        borderColor: COLORS.primary,
    }
})