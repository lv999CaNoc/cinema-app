import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { COLORS, SIZES } from '../../constants';
import { LangContext } from '../../contexts/LangContext';
import Sort from '../modals/Sort';

const Controls = (props) => {
    const { i18n } = useContext(LangContext);

    const { selectedDate,
        selectedSort,
        selectedByCinema,
        onDateChange,
        onSortChange,
        onByCinemaChange } = props

    // Date time picker
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        onDateChange(date);
        hideDatePicker();
    };

    // sort
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // toggle switch
    const toggleSwitch = () => {
        onByCinemaChange(!selectedByCinema);
    };

    return (
        <View style={styles.controls}>
            <Pressable style={styles.control} onPress={showDatePicker}>
                <Image style={styles.iconLayout} resizeMode="cover" source={require('../../assets/icons/Calendar.png')} />
                <Text style={styles.title}>
                    {selectedDate ? selectedDate.toLocaleDateString('en-GB') : i18n.t('controls.no_date_selected')}
                </Text>
            </Pressable>
            <DateTimePickerModal
                date={selectedDate}
                isVisible={datePickerVisible}
                minimumDate={new Date()}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <Pressable style={styles.control} onPress={toggleModal}>
                <Image style={styles.iconLayout} resizeMode="cover" source={require("../../assets/icons/Sort.png")} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>{i18n.t("sort."+selectedSort.by)}</Text>
                    {selectedSort.order === 0 ? (
                        <AntDesign name="arrowup" size={14} color="white" />
                    ) : (
                        <AntDesign name="arrowdown" size={14} color="white" />
                    )}
                </View>
            </Pressable>
            <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="zoomOut"
                onBackdropPress={toggleModal}
                backdropOpacity={0.8}
            >
                <Sort selectedSort={selectedSort} onSortChange={onSortChange} onHide={toggleModal} />
            </Modal>

            <View style={styles.control}>
                <Switch style={{ height: 24 }}
                    trackColor={{ false: '#253554', true: COLORS.primary }}
                    thumbColor={selectedByCinema ? 'white' : COLORS.icon}
                    onValueChange={toggleSwitch}
                    value={selectedByCinema}
                />
                <Text style={styles.title}>{i18n.t('controls.by_cinema')}</Text>
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
