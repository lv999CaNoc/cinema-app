import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { LangContext } from '../../contexts/LangContext';

const QRView = ({ticket}) => {
  const { i18n} = useContext(LangContext);  

    return (
        <View style={styles.container}>
            <View style={styles.qr}>
                <View style={styles.codeWrapper}>
                    <Image style={styles.codeIcon} resizeMode='cover' source={{ uri: ticket.qrImageURL }} />
                </View>
            </View>
            <View style={styles.qrDetails}>
                <View style={styles.detail}>
                    <Text style={styles.header}>{i18n.t("session.seat")}:   </Text>
                    <Text style={[styles.header, styles.desc()]}>{ticket.seat.name}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.header}>{i18n.t('ticket.status')}:   </Text>
                    <Text style={[styles.header, styles.desc(ticket.bill.status)]}>{i18n.t('ticket.'+ticket.bill.status)}</Text>
                </View>
            </View>
        </View>
    )
}

export default QRView

const styles = StyleSheet.create({
    container:{
        width: SIZES.width,
        paddingBottom: SIZES.medium
    },
    qr: {
        paddingTop: SIZES.xxSmall,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    codeWrapper: {
        borderRadius: 16,
        backgroundColor: "#fff",
        padding: SIZES.xxSmall,
    },
    codeIcon: {
        width: 240,
        height: 240,
    },
    qrDetails: {
        marginTop: SIZES.medium
    },
    detail:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
        color: COLORS.icon,
        fontFamily: 'regular',
        fontSize: 15,
    },
    desc: (status) => {
        if (status === "COMPLETE") {
            return {
                color: '#3b8f32',
                fontFamily: 'medium'
            };
        } else if (status === "PENDING") {
            return {
                color: '#e39d24',
                fontFamily: 'medium'
            };
        } else if (status === "CANCEL") {
            return {
                color: '#a33939',
                fontFamily: 'medium'
            };
        }
        return {
            color: COLORS.white,
            fontFamily: 'medium'
        };
    }
})