import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, CONFIG, SIZES } from '../../constants'
import { LangContext } from '../../contexts/LangContext'
import Loader from '../utils/Loader'
import CinemaHeading from './CinemaHeading'
import Controls from './Controls'
import SessionTile from './SessionTile'

const Session = ({movieId}) => {
  const { i18n } = useContext(LangContext);
  
  const [responseData, setResponseData] = useState({})
  const [notGroupData, setNotGroupData] = useState({})
  const [groupData, setGroupData] = useState({})
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  // Update options
  const [date, setDate] = useState(new Date())
  const [sort, setSort] = useState({by: 'time', order: 0})
  const [group, setGroup] = useState(false)

  useEffect(()=>{
    const loadSession = async ()=>{
      var url = CONFIG.BASE_URL+"/theater/schedules?movieId="+movieId+"&date="+moment(date).format('YYYY-MM-DD');
      console.log(url);

      await axios.get(url)
      .then((response) => {
        setResponseData(response.data.data);
      })
      .catch(error => {
        Alert.alert(i18n.t('common.notification'), i18n.t('error._'));
        console.log('Error:', error.response.data);
      });
    }
    setLoading(true)
    loadSession(date)
  },[date])

  useEffect(() => {
    const filterSesstion = ()=>{
      var sortedData = Array.from(responseData);
      
      if (sort.by==='price'){
        sortedData = sortedData.sort((a, b)=>{
          return a.price-b.price;
        })
      }

      if (sort.order===1){
        sortedData.reverse()
      }

      if (group){
        setGroupData(combineSchedules(sortedData))
      }else{
        setNotGroupData(sortedData)
      }
    }

    const combineSchedules = (data) => {
      return data.reduce((acc, schedule) => {
        const existingTheater = acc.find(item => item.theater.id === schedule.room.theater.id);
    
        if (existingTheater) {
          existingTheater.schedules.push({
            id: schedule.id,
            startDate: schedule.startDate,
            price: schedule.price,
            room: schedule.room
          });
        } else {
          acc.push({
            theater: schedule.room.theater,
            schedules: [{
              id: schedule.id,
              startDate: schedule.startDate,
              price: schedule.price,
              room: schedule.room
            }],
          });
        }
        
        return acc;
      }, []);
    };
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    filterSesstion()
    setLoading(false)
  }, [responseData, sort, group]);

  const contentComp = ()=> {
    return (group)? (
      <FlatList
        data={groupData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <CinemaHeading item={item.theater}/>
            <FlatList
              data={item.schedules}
              renderItem={(schedule) => <SessionTile item={schedule.item} cinema={false} />}
            />
          </View>
        )}
      />
    ) : (
      <FlatList
        data={notGroupData}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={8}
        renderItem={({ item }) => <SessionTile item={item} cinema={true} />}
      />
    )
  }

  const noContentComp = () =>{
    return (
    <View style={styles.content}>
          <View style={styles.placeholder}>
            <Image resizeMode='cover' source={require('../../assets/images/Illustration.png')}/>
            <Text style={styles.placeholderTxt}>{i18n.t('session.no_available')}</Text>
          </View>
    </View>)
  }

  return (
    <View style={{ flex: 1 }}>
      <Controls
        selectedDate={date}
        selectedSort={sort}
        selectedByCinema={group}
        onDateChange={setDate}
        onSortChange={setSort}
        onByCinemaChange={setGroup}
      />

      <View style={styles.result}>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>{i18n.t('sort.time')}</Text>
          <Text style={styles.txtHeader}>{i18n.t('session.cinema')}</Text>
        </View>

        {
          loading ? (
            <Loader />
          ) : (
            responseData.length === 0 ? (
              noContentComp()
            ) : (
              contentComp()
            )
          )
        }
      </View>
    </View>
  )
}

export default Session

const styles = StyleSheet.create({
  result: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.xxSmall,
    backgroundColor: "#253554"
  },
  txtHeader: {
    fontFamily: 'bold',
    color: COLORS.icon,
    fontSize: 14,
    width: '30%',
    textAlign: 'center',
    marginEnd: SIZES.large
  },
  content:{
    flex: 1,
    paddingTop: SIZES.medium
  },
  placeholder:{
    flex:1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderTxt:{
    color: COLORS.icon,
    marginTop: SIZES.small,
    fontFamily: 'regular'
  },
})