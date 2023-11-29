import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import Button from '../utils/Button'
import Topbar from '../utils/Topbar'
import Trailer from './Trailer'
import { LangContext } from '../../contexts/LangContext'

const About = ({item, onSelectMovie}) => {
    const { i18n } = useContext(LangContext);

    return (
        <View style={{ flex: 1 }}> 
            <Trailer movieUri={item.trailerURL} />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.rating}>
                    <View style={styles.tab}>
                        <Topbar left={false} right={false} title={item.likePercentage/10} subtitle={"IDBM"} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Topbar left={false} right={false} title={item.revenuePercentage/10} subtitle={"Metascore"} />
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.param}>
                        <View style={styles.row}>
                            <Text style={styles.col1}>{i18n.t('about.certificate')}</Text>
                            <Text style={styles.col2}>{item.rated}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>{i18n.t('about.runtime')}</Text>
                            <Text style={styles.col2}>{item.duration} {i18n.t('common.minutes')}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>{i18n.t('about.release')}</Text>
                            <Text style={styles.col2}>{item.releaseDate}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>{i18n.t('about.genre')}</Text>
                            <Text style={styles.col2}>...E... Action, Crime, Drama</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>{i18n.t('about.dir')}</Text>
                            <Text style={styles.col2}>{item.director}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>{i18n.t('about.actors')}</Text>
                            <Text style={styles.col2}>{item.actors}</Text>
                        </View>
                    </View>
                    <Button theme='primary' small={false} icon={false} title={i18n.t('about.select_movie')} onPress={onSelectMovie} />
                </View>
            </ScrollView>
            </View>
        
    )
}

export default About

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        backgroundColor: COLORS.background2
    },
    tab: {
        flex: 1,
        borderEndWidth: 2,
        borderColor: "#6D9EFF1A"
    },
    content: {
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.small
    },
    title: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.white,
        lineHeight: SIZES.xLarge + 6,
        paddingVertical: SIZES.small
    },
    description: {
        fontFamily: 'regular',
        fontSize: 14,
        lineHeight: SIZES.medium + 6,
        color: COLORS.white,
        paddingBottom: SIZES.medium
    },
    param: {
        marginBottom: SIZES.medium
    },
    row: {
        flexDirection: 'row',
        marginBottom: SIZES.xSmall
    },
    col1: {
        fontFamily: 'regular',
        fontSize: 14,
        color: COLORS.icon,
        width: 80,
        marginEnd: SIZES.medium
    },
    col2: {
        fontFamily: 'regular',
        fontSize: 14,
        flex: 1,
        color: COLORS.white,
    }
})