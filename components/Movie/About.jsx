import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import Button from '../utils/Button'
import Topbar from '../utils/Topbar'
import Trailer from './Trailer'

const About = ({item}) => {
    return (
        <View style={{ flex: 1 }}> 
            <Trailer movieUri={"https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202305/11117_301_100001.mp4"} />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.rating}>
                    <View style={styles.tab}>
                        <Topbar left={false} right={false} title={'8.3'} subtitle={"IDBM"} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Topbar left={false} right={false} title={'8.3'} subtitle={"IDBM"} />
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Doraemon: Nobita và Vùng Đất Lý Tưởng Trên Bầu Trời</Text>
                    <Text style={styles.description}>
                        When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.
                    </Text>
                    <View style={styles.param}>
                        <View style={styles.row}>
                            <Text style={styles.col1}>Certificate</Text>
                            <Text style={styles.col2}>16+</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>Runtime</Text>
                            <Text style={styles.col2}>02:56</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>Release</Text>
                            <Text style={styles.col2}>2022</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>Genre</Text>
                            <Text style={styles.col2}>Action, Crime, Drama</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>Director</Text>
                            <Text style={styles.col2}>Matt Reeves</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.col1}>Cast</Text>
                            <Text style={styles.col2}>Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Colin Farrell, Paul Dano, John Turturro, 	Andy Serkis, Peter Sarsgaard</Text>
                        </View>
                    </View>
                    <Button theme='primary' small={false} icon={false} title={'Select Movie'} onPress={() => console.log('prrr')} />
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