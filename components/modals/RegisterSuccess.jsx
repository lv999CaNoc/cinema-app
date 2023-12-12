import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LangContext } from '../../contexts/LangContext';
import { COLORS, SIZES, STYLES } from '../../constants';
import Button from '../utils/Button';

const RegisterSuccess = ({navigation}) => {
    const { i18n } = useContext(LangContext);

    return (
        <View style={STYLES.modal}>
            <View style={styles.container}>
                <Image style={styles.img} resizeMode='cover' source={require('../../assets/images/Illustration.png')} />
                <Text style={styles.desc}>Đăng ký thành công.</Text>
                <Text style={styles.desc}>Vui lòng kiểm tra email để xác nhận!</Text>

                <View style={styles.btn}>
                    <Button theme={"secondary"} small={true} title={"Đồng ý"} onPress={navigation.navigate("Login")} />
                </View>
            </View>
        </View>
    )
}

export default RegisterSuccess

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.medium,
        backgroundColor: "#1a2435",
        paddingTop: 60,
        width: '93%',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    img: {
        marginBottom: SIZES.large,
        alignSelf: 'center'
    },
    desc: {
        fontFamily: 'bold',
        fontSize: 14,
        color: COLORS.white,
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        paddingBottom: SIZES.xxSmall
    },
    btn: {
        marginTop: SIZES.medium,
        width: "90%",
        alignSelf: 'center',
        marginBottom: 30
    }
})