import { StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SIZES, COLORS, STYLES } from '../../constants'
import ItemList from '../utils/ItemList'
import Button from '../utils/Button'
import { LangContext } from '../../contexts/LangContext'

const Language = ({ onHide }) => {
    const { i18n, lang, handleChangeLang } = useContext(LangContext);
    const [chooseLang, setChooseLang] = useState(lang)
    return (
        <View style={STYLES.modal}>
            <View style={styles.list}>
                <ItemList selected={chooseLang === 'en'} title={i18n.t('language.en')}
                    onPress={() => { setChooseLang('en') }} />
                <ItemList selected={chooseLang === 'vi'} title={i18n.t('language.vi')}
                    onPress={() => { setChooseLang('vi') }} />
                <View style={styles.control}>
                    <Button theme="primary" small={true} title={i18n.t('common.apply')}
                        onPress={() => {
                            onHide()
                            handleChangeLang(chooseLang)
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
    control: {
        marginTop: SIZES.small
    }
})