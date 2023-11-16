import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { COLORS, SIZES } from '../../constants'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../contexts/AuthContext';

const Topbar = ({ left, right, title, subtitle, navigation, goHome, logout }) => {
    const { isLogout } = useContext(AuthContext);

    const onLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure to logout?",
            [
                {
                    text: "Cancel", onPress: () => console.log("cancel pressed")
                },
                {
                    text: "Continue", onPress: async () => {
    
                        try {
                            await SecureStore.deleteItemAsync('jwt');
                            isLogout()
                            navigation.navigate('Home')
                        } catch (error) {
                            console.log("error: " + error)
                        }
                    }
                }
            ]
        )
    }
    return (
        <View style={styles.topbar}>
            {left ? (<TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={24} color={COLORS.icon} /></TouchableOpacity>) : (<View style={styles.icon}></View>)}
            <View style={styles.contents}>
                {title ? (<Text style={[styles.text, styles.title]}>{title}</Text>) : ('')}
                {subtitle ? (<Text style={[styles.text, styles.subtitle]}>{subtitle}</Text>) : ('')}
            </View>

            {right ? (<TouchableOpacity onPress={() => console.log('top bar: search press')}><Ionicons name="search" size={24} color={COLORS.icon} /></TouchableOpacity>) : ('')}
            {goHome ? (<TouchableOpacity onPress={() => navigation.navigate('Home')}><Feather name="home" size={24} color={COLORS.icon} /></TouchableOpacity>) : ('')}
            {logout ? (<TouchableOpacity onPress={onLogout}><MaterialCommunityIcons name="logout" size={24} color={COLORS.icon} /></TouchableOpacity>) : ('')}

            {!goHome && !right && !logout ? (<View style={styles.icon}></View>) : ('')}
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
    title: {
        fontSize: 18,
        fontFamily: 'bold',
        letterSpacing: 0.6,
        color: COLORS.white
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'regular',
        letterSpacing: 0.9,
        color: COLORS.icon
    },
    icon: {
        width: 24
    }
})