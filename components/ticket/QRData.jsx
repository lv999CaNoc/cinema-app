import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, CONFIG, SHADOWS, SIZES } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { LangContext } from '../../contexts/LangContext';
import Loader from '../utils/Loader';
import TearLine from './TearLine';

const QRData = ({ token }) => {
    const { i18n } = useContext(LangContext);
    const { config } = useContext(AuthContext);

    const [seat, setSeat] = useState()
    const [bill, setBill] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [accept, setAccept] = useState()
    const [loading, setLoading] = useState(true);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        const loadTicket = async () => {
            var url = CONFIG.BASE_URL + "/tickets/check";
            console.log("Check QR code: " + url);
            await axios.post(url, { token }, config)
                .then((response) => {
                    setAccept(true)
                    setSeat(response.data.data.seat)
                    setBill(response.data.data.bill)
                })
                .catch(error => {
                    setAccept(false)
                    setErrorMsg(error.response.data)
                    console.log('Error:', error.response.data);
                });
        }
        setLoading(true)
        loadTicket()
    }, [])

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        setLoading(false)
    }, [bill])

    return (
        <ScrollView style={{ marginBottom: 90 }}>
            <View style={styles.container}>
                {
                    loading ? (<Loader />) :
                        accept ?
                            (
                                <View style={styles.qrStatus}>
                                    <AntDesign name="circledown" size={40} color="white" />
                                    <Text style={styles.qrStatusDetail}>{i18n.t('common.valid_QR_code')}</Text>
                                </View>
                            )
                            :
                            (
                                <View style={styles.qrStatus}>
                                    <AntDesign name="closecircle" size={40} color="red" />
                                    <Text style={styles.qrStatusDetail}>{i18n.t('common.invalid_QR_code')}</Text>
                                </View>
                            )
                }

                <TearLine />
                {
                    errorMsg &&
                    <View style={styles.content}>
                        <Text style={styles.error}>{errorMsg}</Text>
                    </View>
                }

                {
                    loading ? (<Loader />) : (
                        <View>
                            <View style={styles.content}>
                                <Text style={styles.header}>{i18n.t('common.user_information')}</Text>
                                <View style={styles.details}>
                                    <View style={styles.detail}>
                                        <Text style={styles.header}>{i18n.t('common.username')}</Text>
                                        <Text style={[styles.desc, styles.h1]}>{bill.user.username}</Text>
                                    </View>
                                    <View style={styles.detail}>
                                        <Text style={styles.header}>Email</Text>
                                        <Text style={[styles.desc, styles.h2]}>{bill.user.email}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.header}>{i18n.t('common.ticket_information')}</Text>
                                <Text style={[styles.desc, { textAlign: 'center' }]}>{i18n.t("session.seat")} {seat.name} - {seat.room.name} - {seat.room.theater.name}</Text>
                                <View style={styles.details}>
                                    <View style={styles.detail}>
                                        <Text style={styles.header}>{i18n.t('sort.time')}</Text>
                                        <Text style={[styles.desc, styles.h2]}>{moment(bill.schedule.startDate).format("HH:mm, DD/MM/YYY")}</Text>
                                    </View>
                                    <View style={styles.detail}>
                                        <Text style={styles.header}>{i18n.t('ticket.status')}</Text>
                                        <Text style={styles.desc}>{i18n.t("ticket." + bill.status)}</Text>
                                    </View>
                                    <View style={styles.detail}>
                                        <Text style={styles.header}>{i18n.t('common.payment_time')}</Text>
                                        <Text style={[styles.desc, styles.h2]}>{moment(bill.schedule.createdTime).format("HH:mm, DD/MM/YYY")}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.header}>{i18n.t('common.movie_information')}</Text>
                                <Text style={[styles.desc, { textAlign: 'center' }]}>{bill.schedule.movie.title}</Text>
                                <View style={styles.detail}>
                                    <Text style={styles.header}>{i18n.t('common.release_date')}</Text>
                                    <Text style={[styles.desc, styles.h2]}>{moment(bill.schedule.movie.releaseDate).format("DD/MM/YYY")}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.header}>{i18n.t('common.end_date')}</Text>
                                    <Text style={[styles.desc, styles.h2]}>{moment(bill.schedule.movie.endDate).format("DD/MM/YYY")}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

export default QRData

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background2,
        paddingVertical: SIZES.large,
    },
    qrStatus: {
        paddingTop: 60,
        paddingBottom: SIZES.medium,
        alignItems: 'center',
    },
    qrStatusDetail: {
        fontFamily: 'bold',
        color: 'white',
        fontSize: 17,
        marginTop: SIZES.xSmall
    },
    content: {
        backgroundColor: COLORS.background,
        marginTop: SIZES.medium,
        marginHorizontal: SIZES.medium,
        borderRadius: SIZES.small,
        padding: SIZES.xSmall,
        ...SHADOWS.small
    },
    error: {
        fontFamily: 'medium',
        fontSize: 14,
        textAlign: 'center',
        color: 'red'
    },
    header: {
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.icon,
        marginBottom: SIZES.xxSmall
    },
    details: {
        paddingTop: SIZES.small
    },
    detail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SIZES.small
    },
    h1: {
        fontSize: 14,
    },
    h2: {
        fontFamily: 'semibold',
        fontSize: 13,
    },
    desc: {
        fontFamily: 'bold',
        fontSize: 15,
        color: COLORS.white,
    },
})