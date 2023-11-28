import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const Payment = () => {
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} 
        onPress={() => { 
            console.log('movie tile') 
            navigation.navigate('Ticket')
        }}>
            <Image style={styles.image} resizeMode='cover' source={{ uri: 'https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202305/11117_103_100004.jpg' }} />
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.title}>The Batman xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx</Text>
                <View>
                    <Text numberOfLines={1} style={styles.date}>11/11/2023, 14:40</Text>
                    <Text numberOfLines={1} style={styles.cinema}>Eurasia Cinema7</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default Payment

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