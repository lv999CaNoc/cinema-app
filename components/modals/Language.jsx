import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SIZES, COLORS, STYLES } from '../../constants'
import ItemList from '../utils/ItemList'
import Button from '../utils/Button'

import i18n from '../../lib/I18n'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = ({ onHide }) => {
    const [lang, setLang] = useState('')

    useEffect(() => {
        // Load ngôn ngữ hiện tại từ AsyncStorage
        const loadLanguage = async () => {
            try {
                var language = await AsyncStorage.getItem('language');
                if (!language) {
                    language = "vi";
                }
                i18n.locale = language;
                setLang(language);
            } catch (error) {
                console.error('Error loading language:', error);
            }
        };

        loadLanguage();
    }, []);

    const handleChangeLang = async (newLanguage) => {
        i18n.locale = newLanguage;
        setLang(newLanguage);

        // Lưu ngôn ngữ mới vào AsyncStorage
        try {
            await AsyncStorage.setItem('language', newLanguage);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    }

    return (
        <View style={STYLES.modal}>
            <View style={styles.list}>
                <ItemList selected={lang === 'en'} title={i18n.t('language.en')}
                    onPress={() => { setLang('en')}} />
                <ItemList selected={lang === 'vi'} title={i18n.t('language.vi')}
                    onPress={() => { setLang('vi')}} />
                <View style={styles.control}>
                    <Button theme="primary" small={true} title={i18n.t('common.apply')}
                        onPress={() => {
                            onHide()
                            handleChangeLang(lang)
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