import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { Formik } from 'formik'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { Button, RegisterSuccess, Topbar } from '../components'
import { COLORS, CONFIG, SIZES, STYLES } from '../constants'
import { LangContext } from '../contexts/LangContext'

const Register = ({ navigation }) => {
  const { i18n} = useContext(LangContext);   
   
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(i18n.t('error.email_format'))
      .required(i18n.t('error.email_required')),
  
    username: Yup.string().min(6, i18n.t('error.username_leng')).required(i18n.t('error.username_required')),
  
    password: Yup.string().min(8, i18n.t('error.password_leng'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        i18n.t('error.password_format')
      )
      .required(i18n.t('error.password_required')),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], i18n.t('error.c_password_not_match'))
      .required(i18n.t('error.c_password_required'))
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

  const [showError, setShowError] = useState([false, false, false, false]);
  const [passwordSecureText, setPasswordSecureText] = useState(true)
  const [cPasswordSecureText, setCPasswordSecureText] = useState(true)   // Date time picker
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleShowError = (index) => {
    const updatedErrors = [...showError];
    updatedErrors[index] = true;
    setShowError(updatedErrors);
  };

  const register = async (values) => {
    const endpoint = CONFIG.BASE_URL + "/auth/register";
    console.log("POST " + endpoint);

    await axios.post(endpoint, values)
      .then(response => {
        console.log('Info: '+response.data);
        Alert.alert(
          "Đăng ký thành công!",
          "Vui lòng kiểm tra email để xác nhận tạo tài khoản.",
          [
            {
              text: i18n.t('common.continue'), onPress: () => {navigation.navigate("Login")}
            }
          ]
        )
      })
      .catch(error => {
        var errMsg = 'common.register_err_msg';
        if (error.response.data.errorCode === '409') {
          const message = error.response.data.message;
          if (message === "Username Already Exist") {
            errMsg = 'error.username_already_exist';
          } else if (message === "Email Already Exist") {
            errMsg = 'error.email_already_exist';
          }
        }
        Alert.alert(
          i18n.t('common.failed'),
          i18n.t(errMsg),
          [
            {
              text: i18n.t('common.cancel'), onPress: () => { }
            },
            {
              text: i18n.t('common.continue'), onPress: () => { }
            }
          ]
        )
    });
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar left={true} navigation={navigation} goHome={true} />

      <Text style={styles.title}>{i18n.t("common.register")}</Text>
      <ScrollView>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            dayOfBirth: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => register(values)}
        >
          {({ handleChange, handleSubmit, errors, touched, isValid, values, setValues, setFieldTouched }) => (
            <View style={styles.formContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper(touched.email ?  COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='email-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder={i18n.t('common.enter_email')}
                    placeholderTextColor={COLORS.icon}
                    onFocus={() => setFieldTouched('email')}
                    onBlur={() => {
                      setFieldTouched('email', '')
                      handleShowError(0)
                    }}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                </View>
                {showError[0] && errors.email ? (
                  <Text style={styles.errMessage}>{errors.email}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>{i18n.t('common.username')}</Text>
                <View style={styles.inputWrapper(touched.username ?  COLORS.icon : COLORS.border)}>
                <Ionicons name="person-outline" size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder={i18n.t('common.enter_username')}
                    placeholderTextColor={COLORS.icon}
                    onFocus={() => {setFieldTouched('username')}}
                    onBlur={() => {
                      setFieldTouched('username', '')
                      handleShowError(1)
                    }}
                    onChangeText={handleChange('username')}
                    value={values.username}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                </View>
                {showError[1] && errors.username ? (
                  <Text style={styles.errMessage}>{errors.username}</Text>
                ): (
                  <Text style={styles.errMessage}></Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Ngày sinh</Text>
                <TouchableOpacity
                  style={styles.inputWrapper(touched.dayOfBirth ? COLORS.icon : COLORS.border)}
                  onPress={() => {
                    setFieldTouched('dayOfBirth');
                    setDatePickerVisible(true);
                  }}
                >
                  <Ionicons name="today" size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <Text style={styles.inputTxt}>{values.dayOfBirth ?  moment(values.dayOfBirth).format('DD/MM/YYYY') : 'DD/MM/YYYY'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={values.dayOfBirth || new Date()}
                  isVisible={datePickerVisible}
                  maximumDate={new Date()}
                  display="inline"
                  mode="date"
                  onConfirm={(date) => {
                    setFieldTouched('dayOfBirth', '');
                    setValues({ ...values, dayOfBirth: date });
                    setDatePickerVisible(false);
                  }}
                  onCancel={()=>setDatePickerVisible(false)}
                />
                <Text style={styles.errMessage}></Text>
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>{i18n.t('common.password')}</Text>
                <View style={styles.inputWrapper(touched.password ? COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder={i18n.t('common.enter_password')}
                    placeholderTextColor={COLORS.icon}
                    secureTextEntry={passwordSecureText}
                    onFocus={() => setFieldTouched('password')}
                    onBlur={() => {
                      setFieldTouched('password', '')
                      handleShowError(2)
                    }}
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
                {showError[2] && errors.password ? (
                  <Text style={styles.errMessage}>{errors.password}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>{i18n.t('common.c_password')}</Text>
                <View style={styles.inputWrapper(touched.confirmPassword ? COLORS.icon : COLORS.border)}>
                  <MaterialCommunityIcons name='lock-outline' size={20} color={COLORS.icon} style={styles.iconStyle} />
                  <TextInput placeholder={i18n.t('common.enter_c_password')}
                    placeholderTextColor={COLORS.icon}
                    secureTextEntry={cPasswordSecureText}
                    onFocus={() => setFieldTouched('confirmPassword')}
                    onBlur={() => {
                      setFieldTouched('confirmPassword', '')
                      handleShowError(3)
                    }}
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
                {showError[3] && errors.confirmPassword ? (
                  <Text style={styles.errMessage}>{errors.confirmPassword}</Text>
                ):(
                  <Text style={styles.errMessage}></Text>
                )}
              </View>
              
              <Button theme={'primary'} small={true} title={i18n.t('common.register')} onPress={isValid ? handleSubmit : inValidForm}/>
            </View>
          )}

        </Formik>

        <View style={styles.login}>
          <Text style={styles.loginTxt}>{i18n.t('common.have_account')} </Text>
          <Text style={[styles.loginTxt, styles.link]} onPress={() => navigation.navigate('Login')}>{i18n.t('common.login')}</Text>
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.8}>
        <RegisterSuccess navigation={navigation} />
      </Modal>
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
    color: '#DB1210',
    fontFamily: 'semibold',
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