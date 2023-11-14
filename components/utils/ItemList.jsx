import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';

const ItemList = (props) => {
    const { selected, title , onPress} = props;
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <View style={[styles.wrap2, styles.wrapSpaceBlock]}>
                {selected ? (
                    <MaterialIcons name="done" size={24} color={COLORS.icon} />
                ): (<View style={styles.selectedIcon}></View>)}
                <Text style={[styles.title, styles.labelTypo]}>{title}</Text>
            </View>
            <View style={styles.border} />
        </Pressable>
    )
}

export default ItemList

const styles = StyleSheet.create({
    wrap2: {
        paddingLeft: SIZES.xSmall,
    },
    wrapSpaceBlock: {
        paddingVertical: 4,
        paddingRight: 4,
        height: 48,
        alignItems: "center",
        flexDirection: "row",
    },
    selectedIcon: {
        width: 24, 
    },
    title: {
        flex: 1,
        paddingHorizontal: SIZES.medium,
        color: COLORS.white,
        fontFamily: 'bold',
    },
    labelTypo: {
        textAlign: "left",
        fontSize: SIZES.medium,
    },
    border: {
        borderTopWidth: 1,
        borderColor: COLORS.border,
    },
})