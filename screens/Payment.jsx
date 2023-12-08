import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Loader } from '../components';
import { CONFIG, STYLES } from '../constants';
import { LangContext } from '../contexts/LangContext';

const Payment = ({navigation}) => {
    const { i18n} = useContext(LangContext);
    const [approvalUrl, setApprovalUrl] = useState(null)
    
    const data = {
        billId: 18,
        price: 1.5,
        description: 'description'
      };

    useEffect(() => {
        createOrder(data)
    }, [])

    const createOrder = async (order)=>{
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob25nZHVjMjAwMiIsImlhdCI6MTcwMTkxNjQzNiwiZXhwIjoxNzAyMDAyODM2fQ.RtZCIBhoBPRguDrkrDj6_PfY6kbkdNqFFTt20ceJfWY',
        }
      };
      
      const endpoint = CONFIG.BASE_URL+'/payment';

      const response = await axios.post(endpoint, order, config);

      if (response.status===200){
        setApprovalUrl(response.data)
      }else{
        Alert.alert("Error"
        [
          {
            text: i18n.t('common.cancel'), onPress: () => { }
          },
          {
            text: i18n.t('common.continue'), onPress: () => { }
          }
        ])
      }
    }
  
    const processOrder = async (endpoint)=> {
        const response = await axios.get(endpoint);
        console.log(response.data)
        if (response.status===200){
          navigation.navigate('Ticket')
        }
    }

    const handleResponse= data => {
        if (data.url.includes("success")) {
            setApprovalUrl(null);

            const url = data.url;
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
                text: i18n.t('common.cancel'), onPress: () => { }
              },
              {
                text: i18n.t('common.continue'), onPress: () => { }
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