import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { LangContext } from '../../contexts/LangContext';

const SessionTile = ({ item, cinema }) => {
    const { i18n} = useContext(LangContext);    
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.session} onPress={() => {
            console.log('session press ' + item)
            navigation.navigate('SelectSeat')
        }}>
            <View style={[styles.border2, styles.border2Border]} />
            <View style={styles.wrap}>
                <View style={styles.section}>
                    <Text style={styles.time}>15:10</Text>
                    <View style={styles.priceSpaceBlock}>
                        <Text style={styles.paramTypo}>130/140 {i18n.t('session.seats')}</Text>
                    </View>
                </View>
                <View style={[styles.divider1, styles.border2Border]} />
                <View style={styles.section1}>
                    {cinema && <Text style={[styles.title, styles.titleTypo]}>Cinema Hà Đông Hà Nội</Text>}
                    <View style={[styles.price, styles.priceSpaceBlock]}>
                        <View style={styles.itemFlexBox}>
                            <View style={styles.itemDetail}>
                                <Text style={styles.titleDetail}>{i18n.t('session.room')}</Text>
                                <Text style={styles.detail}>P104</Text>
                            </View>
                            <View style={styles.itemDetail}>
                                <Text style={styles.titleDetail}>{i18n.t('session.cost')}</Text>
                                <Text style={styles.detail}>130.000VND</Text>
                            </View>
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
        fontFamily: 'medium'
    },
    itemDetail: {
        alignItems: 'center'
    },
    titleDetail: {
        fontSize: 13,
        color: COLORS.icon
    },
    detail: {
        fontSize: 13,
        textAlign: "left",
        color: COLORS.white,
        fontFamily: 'medium',
    },
    titleTypo: {
        fontSize: 14,
        textAlign: "left",
        color: COLORS.white,
        fontFamily: 'bold',
    },
    priceSpaceBlock: {
        marginTop: 4,
        flexDirection: "row"
    },
    itemFlexBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        width: '30%',
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
        paddingHorizontal: 16,
        paddingVertical: SIZES.xSmall,
        alignItems: "center",
        flexDirection: "row",
    },
    session: {
        width: "100%",
    }
});