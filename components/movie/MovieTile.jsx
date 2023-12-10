import moment from 'moment'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const MovieTile = ({navigation, bill}) => {
    return (
        <Pressable style={styles.container} 
        onPress={() => { 
            console.log('movie tile') 
            navigation.navigate('Ticket', {billId: bill.id})
        }}>
            <Image style={styles.image} resizeMode='cover' source={{ uri: bill.schedule.movie.movieImageURl }} />
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.title}>{bill.schedule.movie.title}</Text>
                <View>
                    <Text numberOfLines={1} style={styles.date}>{moment(bill.schedule.startDate).format("DD/MM/YYYY")}, {moment(bill.schedule.startDate).format("HH:mm")}</Text>
                    <Text numberOfLines={1} style={styles.cinema}>{bill.schedule.room.theater.name}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default MovieTile

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.xSmall,
        backgroundColor: COLORS.background2,
        marginBottom: SIZES.xSmall
    },
    image: {
        width: '25%',
        aspectRatio: 0.8,
        borderRadius: SIZES.xSmall
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: SIZES.medium,
    },
    title: {
        color: COLORS.white,
        fontFamily: 'bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'medium',
        color: COLORS.white,
    },
    cinema: {
        fontFamily: 'medium',
        color: COLORS.icon,
        paddingTop: SIZES.xxSmall
    }
})