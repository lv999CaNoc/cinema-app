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

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Không đúng định dạng email.')
    .required('Email là trường bắt buộc.'),

  password: Yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt.'
    )
    .required('Mật khẩu là trường bắt buộc.'),
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

const Login = ({ navigation }) => {
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
        "Error Logging in",
        "Sai Email hoặc Password",
        [
          {
            text: 'Cancel', onPress: () => {}
          },
          {
            text: 'Continue', onPress: () => {}
          }
        ]
      )
    }
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} goHome={true} />

      <Text style={styles.title}>LOGIN</Text>
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
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper(touched.password ? COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder='Enter password'
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
              
              <Button theme={'primary'} small={true} title={'Login'} onPress={isValid ? handleSubmit : inValidForm}/>
              
              <View style={styles.register}>
                <Text style={styles.registerTxt}>Need an account? </Text>
                <Text style={[styles.registerTxt, styles.link]} onPress={() => navigation.navigate('Register')}>Register</Text>
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