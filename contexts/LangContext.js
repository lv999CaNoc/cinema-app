import React, { createContext, useEffect, useState } from 'react';
import i18n from '../lib/I18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
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
        if (lang===''){
            loadLanguage();
        }
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
    <LangContext.Provider value={{ i18n, lang, handleChangeLang }}>
      {children}
    </LangContext.Provider>
  );
};