import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Switch, Pressable } from "react-native";
import { COLORS, SIZES } from '../../constants';
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Controls = ({ setSessionsData, setTheatersData, setSelectedByCinema }) => {

    // Update options
    const [options, setOptions] = useState({
        selectedDate: new Date(),
        selectedSort: {
            by: 'time',
            order: 'ascending'
        },
        selectedByCinema: false,
    });

    useEffect(() => {
        console.log('Controls: ');
        console.log(options); // Log giá trị options mỗi khi nó thay đổi
    }, [options]);

    const handleDateChange = (date) => {
        setOptions({ ...options, selectedDate: date });
    }
    const handleSortChange = (sort) => {
        setOptions({ ...options, selectedSort: sort });
    }
    const handleByCinemaChange = (option) => {
        setOptions({ ...options, selectedByCinema: option });
    }

    // Date time picker
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        handleDateChange(date);
        hideDatePicker();
    };

    // sort

    // toggle switch
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => {
            const newState = !previousState;
            handleByCinemaChange(newState);
            setSelectedByCinema(newState);
            return newState;
        });
    };

    return (
        <View style={styles.controls}>
            <Pressable style={styles.control} onPress={showDatePicker}>
                <Image style={styles.iconLayout} resizeMode="cover" source={require('../../assets/icons/Calendar.png')} />
                <Text style={styles.title}>
                    {options.selectedDate ? options.selectedDate.toLocaleDateString('en-GB') : 'No date selected'}
                </Text>
            </Pressable>
            <DateTimePickerModal
                date={options.selectedDate}
                isVisible={datePickerVisible}
                minimumDate={new Date()}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <Pressable style={styles.control} onPress={() => { console.log('sort') }}>
                <Image style={styles.iconLayout} resizeMode="cover" source={require("../../assets/icons/Sort.png")} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>Time </Text>
                    <AntDesign name="arrowdown" size={15} color="white" />
                </View>
            </Pressable>


            <View style={styles.control}>
                <Switch style={{ height: 24 }}
                    trackColor={{ false: '#253554', true: COLORS.primary }}
                    thumbColor={isEnabled ? 'white' : COLORS.icon}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={styles.title}>By cinema</Text>
            </View>
        </View>);
};

const styles = StyleSheet.create({
    iconLayout: {
        height: 24,
        width: 24,
        overflow: "hidden"
    },
    title: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.white,
        textAlign: "center",
        marginTop: 4
    },
    control: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controls: {
        backgroundColor: COLORS.background,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingVertical: SIZES.xSmall
    }
});

export default Controls;
