import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ItemInfo, Loader, QRView, TearLine, Topbar } from '../components'
import { COLORS, CONFIG, SIZES, STYLES } from '../constants'
import { LangContext } from '../contexts/LangContext'

const Ticket = ({ navigation, route}) => {
  const { i18n} = useContext(LangContext);    
  const { billId } = route.params;
  
  const [bill, setBill] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      const url = CONFIG.BASE_URL + "/bills/" + billId + "/tickets";
      console.log("GET " + url);

      await axios.get(url)
        .then((response) => {
          setBill(response.data.data[0].bill)

          setTickets(response.data.data.map(item => ({
            id: item.id,
            qrImageURL: item.qrImageURL,
            seat: {
              id: item.seat.id,
              name: item.seat.name
            },
            bill:{
              status: item.bill.status,
              createdTime: item.bill.createdTime,
            }
          })))
        })
        .catch(error => {
          Alert.alert(i18n.t('common.notification'), i18n.t('error._'));
          console.log('Error:', error.response.data);
        });
    }
    setLoading(true)
    loadTickets()
  }, [])

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    setLoading(false)
  }, [bill])

  return (
    <SafeAreaView style={STYLES.container}>
      <Topbar title={i18n.t('ticket._')} navigation={navigation} goHome={true} left={true}/>
      
      <ScrollView>
        {
        loading? <Loader/>:( 
          <FlatList
              data={tickets}
              horizontal={true}
              initialNumToRender={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <QRView ticket={item}/>}
            />
            )
        }
          <Text style={styles.description}>{i18n.t('ticket.msg')}</Text>
          <TearLine />
        {
          loading? <Loader/> : (
            <View style={styles.info}>
              <Text style={styles.title}>{bill.schedule.movie.title}</Text>
              <View style={styles.details}>
                <ItemInfo header={i18n.t('session.cinema')} title={bill.schedule.room.theater.name}
                  desc={bill.schedule.room.theater.address} />
                <ItemInfo header={i18n.t('session.room')} title={bill.schedule.room.name} />
                <ItemInfo header={i18n.t('session.seat')} title={tickets.map(ticket=> ticket.seat.name).join(", ")} />
                <ItemInfo header={i18n.t('session.date')} title={moment(bill.schedule.startDate).format("DD/MM/YYYY")} />
                <ItemInfo header={i18n.t('sort.time')} title={moment(bill.schedule.startDate).format("HH:mm")} />
              </View>
            </View>
          )
        }
        {
          loading? <Loader/> :(
            (bill.status === "PENDING") ? (
              <View style={styles.payment}>
                <Button theme={'primary'} paypal={true} small={false} title={i18n.t('pay._')}
                  onPress={() => {
                    navigation.navigate("Payment", { item: bill, selectedSeat: tickets.map(tickets => tickets.seat) })
                  }} />
              </View>
            ) : (
              <View style={styles.controls}>
                {/* <View style={styles.control}>
                  <Button theme={'secondary'} title={i18n.t('common.refund')} onPress={() => console.log('refund')} />
                </View>
                <View style={styles.control}>
                  <Button theme={'primary'} title={i18n.t('common.send')} onPress={() => console.log('send')} />
                </View> */}
              </View>
            )
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Ticket

const styles = StyleSheet.create({
  
  description: {
    fontFamily: 'regular',
    paddingVertical: SIZES.small,
    textAlign: 'center',
    color: COLORS.icon
  },
  info: {
    paddingHorizontal: SIZES.medium
  },
  title: {
    fontFamily: 'bold',
    fontSize: 18,
    color: COLORS.white,
    paddingVertical: SIZES.medium
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.medium,
  },
  controls:{
    marginBottom: SIZES.medium
  },
  control: {
    width: '47%'
  },
  payment:{
    marginHorizontal: SIZES.medium,
    marginBottom: SIZES.medium
  }

})