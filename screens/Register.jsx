import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, STYLES, SHADOWS } from '../constants'
import { Button, Topbar } from '../components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Không đúng định dạng email.')
    .required('Email là trường bắt buộc.'),

  username: Yup.string().min(6, 'Username tối thiểu 6 ký tự.').required('Username là trường bắt buộc.'),

  password: Yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt.'
    )
    .required('Mật khẩu là trường bắt buộc.'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp.')
    .required('Nhập lại mật khẩu là trường bắt buộc.')
})

const inValidForm = () => {
  Alert.alert(
    "Thông tin không đầy đủ",
    "Vui lòng nhập đầy đủ thông tin.",
    [
      {
        text: 'Continue', onPress: () => { }
      }
    ]
  )
}

const Register = ({ navigation }) => {
  const [loader, setLoader] = useState(false)
  const [responseData, setResponseData] = useState(null)
  const [passwordSecureText, setPasswordSecureText] = useState(true)
  const [cPasswordSecureText, setCPasswordSecureText] = useState(true)

  const register = (values) => {
    console.log(values)
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} goHome={true} />

      <Text style={styles.title}>REGISTER</Text>
      <ScrollView>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => register(values)}
        >
          {({ handleChange, handleSubmit, errors, touched, isValid, values, setFieldTouched }) => (
            <View style={styles.formContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper(touched.email ?  COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='email-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder='Enter email'
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
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputWrapper(touched.username ?  COLORS.icon : COLORS.border)}>
                <Ionicons name="person-outline" size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder='Enter username'
                    placeholderTextColor={COLORS.icon}
                    onFocus={() => setFieldTouched('username')}
                    onBlur={() => setFieldTouched('username', '')}
                    onChangeText={handleChange('username')}
                    value={values.username}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                </View>
                {errors.username ? (
                  <Text style={styles.errMessage}>{errors.username}</Text>
                ): (
                  <Text style={styles.errMessage}></Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper(touched.password ? COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder='Enter password'
                    placeholderTextColor={COLORS.icon}
                    secureTextEntry={passwordSecureText}
                    onFocus={() => setFieldTouched('password')}
                    onBlur={() => setFieldTouched('password', '')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                  <TouchableOpacity onPress={() => { setPasswordSecureText(!passwordSecureText) }}>
                    <MaterialCommunityIcons color={COLORS.icon} name={passwordSecureText ? 'eye-off-outline' : 'eye-outline'} size={22} />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errMessage}>{errors.password}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper(touched.confirmPassword ? COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder='Enter confirm password'
                    placeholderTextColor={COLORS.icon}
                    secureTextEntry={cPasswordSecureText}
                    onFocus={() => setFieldTouched('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword', '')}
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                  <TouchableOpacity onPress={() => { setCPasswordSecureText(!cPasswordSecureText) }}>
                    <MaterialCommunityIcons color={COLORS.icon} name={cPasswordSecureText ? 'eye-off-outline' : 'eye-outline'} size={22} />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? (
                  <Text style={styles.errMessage}>{errors.confirmPassword}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>
              
              <Button theme={'primary'} small={true} title={'Register'} onPress={isValid ? handleSubmit : inValidForm}/>
            </View>
          )}

        </Formik>

        <View style={styles.login}>
          <Text style={styles.loginTxt}>Already have an account? </Text>
          <Text style={[styles.loginTxt, styles.link]} onPress={() => navigation.navigate('Login')}>Login</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.xLarge
  },
  formContainer:{
    maxWidth: 400,
    paddingHorizontal: SIZES.xLarge
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
    fontSize: 13
  },
  login:{
    flexDirection: 'row',
    marginTop: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTxt:{
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