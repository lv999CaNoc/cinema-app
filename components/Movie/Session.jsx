import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SessionTile from './SessionTile'
import CinemaHeading from './CinemaHeading'
import Controls from './Controls'
import { COLORS, SIZES } from '../../constants'

const Session = () => {

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const [selectedByCinema, setSelectedByCinema] = useState(false)
  const [sessionsData, setSessionsData] = useState([{}])
  const [theatersData, setTheatersData] = useState([{}])

  useEffect(() => {
    console.log('Session: ' + selectedByCinema);
  }, [selectedByCinema, sessionsData, theatersData])

  return (
    <View style={{ flex: 1 }}>
      <Controls sessionsData={setSessionsData} theatersData={setTheatersData} setSelectedByCinema={setSelectedByCinema} />

      <View style={styles.result}>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>Time</Text>
          <Text style={styles.txtHeader}>Cinema</Text>
        </View>

        <FlatList
          data={data}
          // keyExtractor={(item) => item.id}
          initialNumToRender={8}
          renderItem={({ item }) => <SessionTile item={item} cinema={false} />}
        />


        {/* by cinema */}
        {/* <FlatList
          data={theatersData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <CinemaHeading/>
              <FlatList
                data={item.sessions}
                // keyExtractor={(session) => session}
                renderItem={(session) => <SessionTile item={session} cinema={false}/>}
              />
            </View>
          )}
        /> */}
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
    width: 74,
    textAlign: 'center',
    marginEnd: SIZES.large
  }
})