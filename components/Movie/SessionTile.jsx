import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';

const SessionTile = ({item, cinema}) => {
    return (
        <TouchableOpacity style={styles.session} onPress={()=> console.log('session press ' + item)}>
            <View style={[styles.border2, styles.border2Border]} />
            <View style={styles.wrap}>
                <View style={styles.section}>
                    <Text style={styles.time}>15:10</Text>
                    <View style={styles.priceSpaceBlock}>
                        <Text style={styles.paramTypo}>IMAX</Text>
                        <Text style={[styles.param1, styles.paramTypo]}>Рус</Text>
                    </View>
                </View>
                <View style={[styles.divider1, styles.border2Border]} />
                <View style={styles.section1}>
                    {cinema && <Text style={[styles.title, styles.titleTypo]}>Kinopark 8 IMAX Saryarka</Text>}
                    <View style={[styles.price, styles.priceSpaceBlock]}>
                        <View style={styles.itemFlexBox}>
                            <Text style={[styles.titleTypo, styles.price1]}>3500 ₸</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.border2, styles.border2Border]} />
        </TouchableOpacity>
    );
}

export default SessionTile

const styles = StyleSheet.create({
    border2Border: {
        borderColor: 'rgba(109, 158, 255, 0.1)',
        borderStyle: "solid"
    },
    paramTypo: {
        color: COLORS.icon,
        fontSize: 14,
        textAlign: "left",
        fontFamily: 'bold'
    },
    titleTypo: {
        fontSize: 14,
        textAlign: "left",
        color: COLORS.white,
        fontFamily: 'bold',
        alignSelf: "stretch"
    },
    priceSpaceBlock: {
        marginTop: 4,
        flexDirection: "row"
    },
    itemFlexBox: {
        overflow: "hidden",
        flex: 1
    },
    border2: {
        borderTopWidth: 1,
        width: SIZES.width,
        height: 1
    },
    time: {
        fontSize: 18,
        textAlign: "left",
        color: COLORS.white,
        fontFamily: 'bold',
        lineHeight: 24
    },
    param1: {
        marginLeft: 8
    },
    section: {
        width: 74,
        alignItems: "center"
    },
    divider1: {
        borderRightWidth: 1,
        width: 1,
        marginLeft: 16,
        alignSelf: "stretch"
    },
    title: {
        fontFamily: 'bold',
        lineHeight: 24,
        fontSize: 14
    },
    price1: {
        fontFamily: 'regular',
        lineHeight: 18,
        height: 18
    },
    item1: {
        marginLeft: 8
    },
    price: {
        alignSelf: "stretch"
    },
    section1: {
        marginLeft: 16,
        flex: 1
    },
    wrap: {
        padding: 16,
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "stretch"
    },
    session: {
        width: "100%",
    }
});