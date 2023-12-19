import { Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieCard } from '../components';
import { COLORS, CONFIG, SIZES, STYLES } from '../constants';
import { LangContext } from '../contexts/LangContext';

const Search = ({ navigation }) => {
  const { i18n } = useContext(LangContext);
  const { handleChange, handleSubmit, touched, values, setFieldTouched, setFieldValue } = useFormik({
    initialValues: {
      keyword: '',
    },
    onSubmit: (values) => handleSearch(values.keyword),
  });

  const [hasResult, setHasResult] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null);
  const [numColumns, setNumColumns] = useState(2)

  const [suggest, setSuggest] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = 164;
    const calculatedColumns = Math.floor(screenWidth / itemWidth);
    setNumColumns(calculatedColumns > 0 ? calculatedColumns : 2);
  }, []);

  const handleSearch = async (keyword) => {
    const url = CONFIG.BASE_URL + "/movies/search?q=" + keyword;
    console.log("GET " + url);

    await axios.get(url)
      .then((response) => {
        setResult(response.data.data)
        setHasResult(true)
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  const handleSuggest = (keyword) => {
    clearTimeout(timeoutId);
    if (keyword !== '') {
      const newTimeoutId = setTimeout(async () => {
        const url = CONFIG.BASE_URL + "/movies/suggest?keyword=" + keyword;
        console.log("GET " + url);

        await axios.get(url)
          .then((response) => {
            setSuggest(response.data.data)
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }, 2000);
      setTimeoutId(newTimeoutId);
    }
  }

  const renderContent = () => {
    if (hasResult) {
      return (
        <View style={{ marginTop: SIZES.small }}>
          <FlatList
            key={numColumns}
            numColumns={numColumns}
            data={result}
            initialNumToRender={4}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            contentContainerStyle={{justifyContent: 'center'}}
          />
        </View>

      )
    }

    if (values.keyword !== '') {
      return (
        <FlatList
          data={suggest}
          keyExtractor={(index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestTile} onPress={() => {
              handleSearch(item)
              setHasResult(true)
            }}>
              <Feather name="search" size={20} color={COLORS.icon} style={{ paddingLeft: 15, paddingRight: SIZES.small }} />
              <Text style={styles.suggestContent}>{item}</Text>

              <TouchableOpacity onPress={() => handleChange('keyword')(item)}>
                <Feather name="arrow-up-left" size={20} color={COLORS.icon} style={{ paddingRight: 15, paddingLeft: SIZES.small }} />
              </TouchableOpacity>
            </TouchableOpacity>)
          }
        />
      )
    }
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={styles.inputWrapper(touched.keyword ? COLORS.icon : COLORS.border)}>
            <Feather name="search" size={20} color={COLORS.icon} style={styles.iconStyle} />
            <TextInput placeholder={i18n.t('home.search_title')}
              placeholderTextColor={COLORS.icon}
              onFocus={() => setFieldTouched('keyword')}
              onBlur={() => { setFieldTouched('keyword', '') }}
              onChangeText={(text) => {
                handleChange('keyword')(text);
                handleSuggest(text);
                setHasResult(false);
              }}
              value={values.keyword}
              autoCapitalize='none'
              onSubmitEditing={handleSubmit}
              style={styles.inputTxt}
            />
            <TouchableOpacity onPress={() => {
              values.keyword.length === 0 ? navigation.goBack() : setFieldValue('keyword', '')
              setHasResult(false)
            }}>
              <Ionicons name="close" size={22} color={COLORS.icon} style={{ paddingLeft: SIZES.xxSmall }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {
            renderContent()
          }
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SIZES.medium,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputTxt: {
    flex: 1,
    color: COLORS.white
  },
  iconStyle: {
    marginRight: 10
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.background2,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    height: 40,
    borderRadius: 12,
  }),
  content: {
    flex: 1
  },
  suggestTile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border
  },
  suggestContent: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLORS.white,
    fontSize: 13.3,
    fontFamily: 'regular',
  }
})