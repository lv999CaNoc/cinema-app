import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES, COLORS, STYLES } from '../../constants'
import ItemList from '../utils/ItemList'
import Button from '../utils/Button'

const Language = ({ onHide }) => {
    const [lang, setLang] = useState('Eng')
    const handleChangeLang = (language) => {
        setLang(language)
    }

    return (
        <View style={STYLES.modal}>
            <View style={styles.list}>
                <ItemList selected={lang === 'Eng'} title={"English"}
                    onPress={() => {
                        console.log('press english')
                        handleChangeLang('Eng')
                    }} />
                <ItemList selected={lang === 'Vie'} title={"Vietnamese"}
                    onPress={() => {
                        console.log('press english')
                        handleChangeLang('Vie')
                    }} />
                <View style={styles.control}>
                    <Button theme="primary" small={true} title="Apply"
                    onPress={() => {
                        onHide()
                    }} />
                </View>
                
            </View>
        </View>)
}

export default Language

const styles = StyleSheet.create({
    list: {
        borderRadius: SIZES.medium,
        backgroundColor: "#1a2435",
        padding: SIZES.medium,
        width: '98%',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    control:{
        marginTop: SIZES.small
    }
})