import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES, SHADOWS } from '../constants'
import { Button, Topbar } from '../components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../contexts/AuthContext';
import { LangContext } from '../contexts/LangContext'



const Login = ({ navigation }) => {
  const { i18n} = useContext(LangContext);    

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(i18n.t('error.email_format'))
      .required(i18n.t('error.email_required')),
  
    password: Yup.string().min(8, i18n.t('error.password_leng'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        i18n.t('error.password_format')
      )
      .required(i18n.t('error.password_required')),
  })
  
  const inValidForm = () => {
    Alert.alert(
      i18n.t('common.incomplete'),
      i18n.t('common.incomplete_err_msg'),
      [
        {
          text: i18n.t('common.cancel'), onPress: () => {}
        },
        {
          text: i18n.t('common.continue'), onPress: () => {}
        }
      ]
    )
  }

  const { isLogin } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [secureText, setSecureText] = useState(true)

  const login = async(values) => {
    if (values.email==='user@gmail.com' && values.password==='User@1234'){
      await SecureStore.setItemAsync('jwt', '123456jwt');
      console.log('Login with Email: user@gmail.com and Password: User@1234')
      
      isLogin()
      navigation.goBack()
    }else{
      Alert.alert(
        i18n.t('common.failed'),
        i18n.t('common.login_err_msg'),
        [
          {
            text: i18n.t('common.cancel'), onPress: () => {}
          },
          {
            text: i18n.t('common.continue'), onPress: () => {}
          }
        ]
      )
    }
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} goHome={true} />

      <Text style={styles.title}>{i18n.t('common.login')}</Text>
      <ScrollView>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => login(values)}
        >
          {({ handleChange, handleSubmit, errors, touched, isValid, values, setFieldTouched }) => (
            <View style={styles.formContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper(touched.email ?  COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='email-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder={i18n.t('common.enter_email')}
                    placeholderTextColor={COLORS.icon}
                    onFocus={() => setFieldTouched('email')}
                    onBlur={() => setFieldTouched('email', '')}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.errMessage}>{errors.email}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>{i18n.t('common.password')}</Text>
                <View style={styles.inputWrapper(touched.password ? COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder={i18n.t('common.enter_password')}
                    placeholderTextColor={COLORS.icon}
                    secureTextEntry={secureText}
                    onFocus={() => setFieldTouched('password')}
                    onBlur={() => setFieldTouched('password', '')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                  <TouchableOpacity onPress={() => { setSecureText(!secureText) }}>
                    <MaterialCommunityIcons color={COLORS.icon} name={secureText ? 'eye-off-outline' : 'eye-outline'} size={22} />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errMessage}>{errors.password}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>
              
              <Button theme={'primary'} small={true} title={i18n.t('common.login')} onPress={isValid ? handleSubmit : inValidForm}/>
              
              <View style={styles.register}>
                <Text style={styles.registerTxt}>{i18n.t('common.no_account')} </Text>
                <Text style={[styles.registerTxt, styles.link]} onPress={() => navigation.navigate('Register')}>{i18n.t('common.register')}</Text>
              </View>
            </View>
          )}

        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.xLarge,
    textTransform: "uppercase"
  },
  formContainer:{
    paddingHorizontal: SIZES.xLarge,
  },
  wrapper: {
    marginBottom: SIZES.xxSmall,
  },
  label: {
    color: COLORS.white,
    fontFamily: 'bold',
    letterSpacing: 1,
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 5,
    marginStart: SIZES.xSmall
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.background2,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    height: 45,
    borderRadius: 12,
  }),
  inputTxt:{
    flex: 1, 
    color: COLORS.white
  },
  iconStyle: {
    marginRight: 10
  },
  errMessage: {
    color: '#999999',
    fontFamily: 'regular',
    marginTop: 5,
    marginLeft: SIZES.xSmall,
    fontSize: 13,
  },
  register:{
    flexDirection: 'row',
    marginTop: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerTxt:{
    fontSize: 15,
    fontFamily: 'medium',
    color: COLORS.white
  },
  link:{
    color: COLORS.primary,
    textShadowColor: 'rgba(255,116,34, 0.5)', 
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  }
})