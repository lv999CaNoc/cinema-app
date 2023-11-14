import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {COLORS, SIZES} from '../../constants'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Topbar = ({left, right, title, subtitle, navigation , goHome}) => {
    return (
        <View style={styles.topbar}>
            {left? (<TouchableOpacity onPress={()=>navigation.goBack()}><Ionicons name="chevron-back" size={24} color={COLORS.icon} /></TouchableOpacity>):(<View style={styles.icon}></View>)}
            <View style={styles.contents}>
                {title? (<Text style={[styles.text, styles.title]}>{title}</Text>):('')}
                {subtitle? (<Text style={[styles.text, styles.subtitle]}>{subtitle}</Text>):('')}
            </View>
            
            {right? (<TouchableOpacity onPress={()=>console.log('top bar: search press')}><Ionicons name="search" size={24} color={COLORS.icon}/></TouchableOpacity>):('')}
            {goHome? (<TouchableOpacity onPress={()=>navigation.navigate('Home')}><MaterialCommunityIcons name="home-import-outline" size={24} color={COLORS.icon} /></TouchableOpacity>):('')}
            
            {!goHome && !right?(<View style={styles.icon}></View>):('')}
        </View>
    );
}

export default Topbar

const styles = StyleSheet.create({
    topbar: {
        backgroundColor: COLORS.background2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 54,
        paddingHorizontal: SIZES.medium
    },
    text: {
        textAlign: 'center',
    },
    title:{
        fontSize: 18,
        fontFamily: 'bold',
        letterSpacing: 0.6,
        color: COLORS.white
    },
    subtitle:{
        fontSize: 14,
        fontFamily: 'regular',
        letterSpacing: 0.9,
        color: COLORS.icon
    },
    icon: {
        width: 24
    }
})