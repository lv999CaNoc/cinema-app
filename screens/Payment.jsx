import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Loader } from '../components';
import { CONFIG, STYLES } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import { LangContext } from '../contexts/LangContext';

const Payment = ({navigation, route}) => {
    const { i18n} = useContext(LangContext);
    const { config } = useContext(AuthContext);

    const {item, selectedSeat} = route.params;
    const [approvalUrl, setApprovalUrl] = useState(null)
    
    const numOfSeat = selectedSeat.length;
      const order =
      {
        billId: item.id,
        price: numOfSeat * item.schedule.price / 23000,
        description: 'Pay for seat: ' + selectedSeat.map(seat => seat.name).join(', ')
      }
    useEffect(() => {
        createOrder(order)
    }, [])

    const createOrder = async (order)=>{
      const endpoint = CONFIG.BASE_URL+'/order/payment';
      console.log("POST "+endpoint);
      await axios.post(endpoint, order, config)
        .then((response) => {
          console.log("createOrder: "+ response.data);

          setApprovalUrl(response.data)
        })
        .catch(error => {
          Alert.alert(i18n.t('common.notification'), i18n.t('error._'),);
          console.log('Error:', error.response.data);
        });
    }
  
    const processOrder = async (endpoint)=> {
      await axios.get(endpoint, config)
      .then((response) => {
        console.log("processOrder done!")
        navigation.navigate('Ticket', {billId: order.billId})
      })
      .catch(error => {
        Alert.alert(i18n.t('common.notification'), i18n.t('error._'));
        console.log('Error:', error.response.data);
      });
    }

    const handleResponse= data => {
        if (data.url.includes("success")) {
            setApprovalUrl(null);

            const url = data.url;
            console.log("url: (handleResponse)"+url)
            const processEndpoint = url.replace("http://sandbox", CONFIG.BASE_URL);

            console.log(processEndpoint);
            processOrder(processEndpoint);
        } else if (data.url.includes("cancel")) {
            setApprovalUrl(null);
            Alert.alert(
            "Thất bại",
            "Thanh toán thất bại",
            [
              {
                text: i18n.t('common.cancel'), onPress: () => {navigation.navigate('Home')}
              },
              {
                text: i18n.t('common.continue'), onPress: () => {navigation.navigate('Home')}
              }
            ])
        } else {
            return;
        }
    };

    return (
        <SafeAreaView style={STYLES.container}>
            {
                approvalUrl?         
                (<WebView source={{ uri: approvalUrl }}
                    onNavigationStateChange={data => { handleResponse(data) }
                  }
                />): (<Loader/>)
            }
        </SafeAreaView>
  )
}

export default Payment

const styles = StyleSheet.create({
})