import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SessionTile from './SessionTile'
import CinemaHeading from './CinemaHeading'
import Controls from './Controls'
import { COLORS, SIZES } from '../../constants'
import { LangContext } from '../../contexts/LangContext'

const Session = () => {
  const { i18n } = useContext(LangContext);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  // Update options
  const [options, setOptions] = useState({
    selectedDate: new Date(),
    selectedSort: {
      by: 'Time',
      order: 0
    },
    selectedByCinema: false,
  });
  useEffect(() => {
    console.log('Session: ');
    console.log(options); // Log giá trị options mỗi khi nó thay đổi
  }, [options]);

  const handleDateChange = (newDate) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      selectedDate: newDate,
    }));
  };

  const handleSortChange = (newSort) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      selectedSort: newSort,
    }));
  };

  const handleByCinemaChange = (newByCinema) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      selectedByCinema: newByCinema,
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Controls
        selectedDate={options.selectedDate}
        selectedSort={options.selectedSort}
        selectedByCinema={options.selectedByCinema}
        onDateChange={handleDateChange}
        onSortChange={handleSortChange}
        onByCinemaChange={handleByCinemaChange}
      />

      <View style={styles.result}>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>{i18n.t('sort.time')}</Text>
          <Text style={styles.txtHeader}>{i18n.t('session.cinema')}</Text>
        </View>

        {options.selectedByCinema ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <CinemaHeading />
                <SessionTile item={item} cinema={false} />
                {/* <FlatList
                  data={item.sessions}
                   keyExtractor={(session) => session}
                  renderItem={(session) => <SessionTile item={session} cinema={false} />}
                /> */}
              </View>
            )}
          />
        ) : (
          <FlatList
            data={data}
            // keyExtractor={(item) => item.id}
            initialNumToRender={8}
            renderItem={({ item }) => <SessionTile item={item} cinema={true} />}
          />
        )}
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
  }
})