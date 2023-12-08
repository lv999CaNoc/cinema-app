import * as React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";


const MovieCard = ({item, navigation}) => {
    const [lineCategories, setLineCategories] = useState('')

    useEffect(()=>{
        const renderCategories = ()=>{
            var line=''
            item.categories.map((category, index)=>{
                if (index===0){
                    line = category.name;
                }else{
                    line = line +", "+ category.name;
                }
            })
            setLineCategories(line)
        }
        renderCategories()
    },[])

    return (
        <View className='flex-row'>
            <TouchableOpacity onPress={() => navigation.navigate('Movie', {movie: item, lineCategories: lineCategories})}>
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
                        <Text style={styles.category} numberOfLines={1}>
                            {lineCategories}
                        </Text>
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
