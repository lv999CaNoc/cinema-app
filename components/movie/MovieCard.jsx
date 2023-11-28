import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SIZES, SHADOWS, COLORS } from "../../constants";


const MovieCard = ({item, navigation}) => {
    return (
        <View className='flex-row'>
            <TouchableOpacity onPress={() => navigation.navigate('Movie', {movie: item})}>
                <View style={styles.movieCard}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            source={{ uri: item.movieImageURl }}
                        />
                    </View>
                    <View style={styles.rating}>
                        <Text style={styles.text}>{item.likePercentage/10}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.category} numberOfLines={1}>Action</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    movieCard:{
        width: 164,
        height: 280,
        marginEnd: SIZES.xxSmall,
        borderRadius: SIZES.medium,
        ...SHADOWS.small
    },
    imageContainer:{
        width: '100%',
        height: 230,
        overflow: "hidden",
        borderRadius: SIZES.medium,
    },
    image:{
        aspectRatio: 0.7,
        resizeMode: 'cover',
    },
    rating:{
        position: "absolute",
        top: SIZES.xxSmall,
        right: SIZES.xxSmall,
        borderRadius: SIZES.xxSmall,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.xxSmall,
        paddingVertical: 4,
    },
    text:{
        color: COLORS.white,
        fontFamily: 'bold'
    },
    info:{
        marginHorizontal: SIZES.xxSmall,
        marginTop: SIZES.xxSmall
    },
    title:{
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'bold'
    },
    category:{
        color: '#637394',
        fontSize: 14,
        fontFamily: 'regular'
    },
});

export default MovieCard;
