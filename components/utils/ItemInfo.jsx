import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const ItemInfo = ({ header, title, desc }) => {
    return (
        <View style={styles.itemLayout}>
            <Text style={styles.itemHeader}>{header}</Text>
            <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}>{title}</Text>
                {desc && <Text style={styles.itemDesc}>{desc}</Text>}
            </View>
        </View>
    )
}

export default ItemInfo

const styles = StyleSheet.create({
    itemLayout: {
        marginBottom: SIZES.small,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemHeader: {
        color: COLORS.icon,
        fontFamily: 'regular',
        fontSize: 16,
        width: '25%',
        marginEnd: SIZES.medium
    },
    itemTitle: {
        fontSize: 15,
        color: COLORS.white,
        fontFamily: 'medium'
    },
    itemDesc: {
        color: COLORS.icon,
        width: '75%',
    }
})