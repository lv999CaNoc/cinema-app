import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, STYLES } from '../../constants';
import ItemList from '../utils/ItemList';
import Button from '../utils/Button';

const sort = [
  { id: 1, name: "Time" },
  { id: 2, name: "Distance" },
  { id: 3, name: "Price" },
];

const order = [
  { id: 0, name: "Ascending ↑" },
  { id: 1, name: "Descending ↓" }
];


const Sort = (props) => {
  const { selectedSort, onSortChange, onHide } = props;

  // local sort option change
  const [sortOption, setSortOption] = useState(selectedSort)
  const [hasChange, setHasChange] = useState(false)
  const handleSortBy = (newSortBy) => {
    setSortOption((prevOptions) => ({
      ...prevOptions,
      by: newSortBy,
    }));
    setHasChange(true);
  };
  
  const handleOrderBy = (newOrderBy) => {
    setSortOption((prevOptions) => ({
      ...prevOptions,
      order: newOrderBy
    }));
    setHasChange(true);
  };

  return (
    <View style={STYLES.modal}>
      <View style={styles.list}>
        <View style={styles.box}>
          <Text style={[styles.sortBy, styles.orderTypo]}>Sort by</Text>
          <FlatList
            data={sort}
            numColumns={1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemList selected={sortOption.by === item.name} title={item.name} onPress={() => handleSortBy(item.name)} />
            )}
          />
        </View>
        <View style={styles.box}>
          <Text style={[styles.sortBy, styles.orderTypo]}>Order by</Text>
          <FlatList
            data={order}
            numColumns={1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemList selected={sortOption.order === item.id} title={item.name} onPress={() => handleOrderBy(item.id)} />
            )}
          />
        </View>
        <Button theme="primary" small={true} title="Apply"
          onPress={() => {
            hasChange && onSortChange(sortOption)
            onHide()
          }} />
      </View>
    </View>
  )
}

export default Sort

const styles = StyleSheet.create({
  list: {
    borderRadius: SIZES.medium,
    backgroundColor: "#1a2435",
    width: '98%',
    padding: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  box: {
    paddingVertical: SIZES.small
  },
  sortBy: {
    color: COLORS.icon,
  },
  orderTypo: {
    textAlign: "left",
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
})