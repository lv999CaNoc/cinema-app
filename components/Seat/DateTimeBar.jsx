import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
const DateTimeBar = ({date, time}) => {
    return (
        <View style={styles.datetime}>
            <View style={styles.buttonSpaceBlock}>
                <Image style={styles.icon} resizeMode="cover" source={require('../../assets/icons/Calendar.png')} />
                <Text style={styles.text}>{date}</Text>
            </View>
            <View style={styles.buttonSpaceBlock}>
                <Image style={styles.icon} resizeMode="cover" source={require('../../assets/icons/Clock.png')} />
                <Text style={styles.text}>{time}</Text>
            </View>
        </View>);
};

const styles = StyleSheet.create({
    buttonSpaceBlock: {
        paddingVertical: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(109, 158, 255, 0.1)",
        borderStyle: "solid",
        borderRadius: SIZES.small,
        flexDirection: "row",
        width: '48%'
    },
    icon: {
        width: 24,
        height: 24,
        overflow: "hidden"
    },
    text: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.white,
        paddingStart: SIZES.xxSmall
    },
    datetime: {
        width: SIZES.width,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        flexDirection: "row",
        justifyContent: 'space-between'
    }
});

export default DateTimeBar;
