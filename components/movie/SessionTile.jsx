import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { LangContext } from '../../contexts/LangContext';

const SessionTile = ({ item, cinema }) => {
    const { i18n} = useContext(LangContext);  
    const { isLoggedIn, dob } = useContext(AuthContext);

    const navigation = useNavigation();

    const checkDob = ()=>{
        const age = moment().diff(moment(dob), 'years');
        const rated = item.movie.rated;
        console.log(rated);
        switch (rated){
            case "C13":
                return age>13;
            case "C16":
                return age>16;
            case "C18":
                return age>18;
        }
        return true;
    }
    return (
        <TouchableOpacity style={styles.session} onPress={() => {
            if (isLoggedIn){
                if (checkDob()){
                    navigation.navigate('SelectSeat', {item})
                }else{
                    Alert.alert(
                        "Phim không phù hợp!",
                        "Phim không phù hợp với tuổi của bạn.",
                        [
                          {
                            text: i18n.t('common.cancel'), onPress: () => { navigation.navigate("Home")}
                          },
                          {
                            text: i18n.t('common.continue'), onPress: () => { navigation.navigate("Home")}
                          }
                        ]
                      )
                }
            }else{
                navigation.navigate("Login")
            }
        }}>
            <View style={[styles.border2, styles.border2Border]} />
            <View style={styles.wrap}>
                <View style={styles.section}>
                    <Text style={styles.time}>{moment(item.startDate).format("HH:mm")}</Text>
                    <View style={styles.priceSpaceBlock}>
                        <Text style={styles.paramTypo}>{item.room.capacity} {i18n.t('session.seats')}</Text>
                    </View>
                </View>
                <View style={[styles.divider1, styles.border2Border]} />
                <View style={styles.section1}>
                    {cinema && <Text style={[styles.title, styles.titleTypo]}>{item.room.theater.name}</Text>}
                    <View style={[styles.price, styles.priceSpaceBlock]}>
                        <View style={styles.itemFlexBox}>
                            <View style={styles.itemDetail}>
                                <Text style={styles.titleDetail}>{i18n.t('session.room')}</Text>
                                <Text style={styles.detail}>{item.room.name}</Text>
                            </View>
                            <View style={styles.itemDetail}>
                                <Text style={styles.titleDetail}>{i18n.t('session.cost')}</Text>
                                <Text style={styles.detail}>{item.price} VND</Text>
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