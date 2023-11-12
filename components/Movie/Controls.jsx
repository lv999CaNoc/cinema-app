import * as React from "react";
import { Image, StyleSheet, Text, View, Switch, Pressable } from "react-native";
import { COLORS, SIZES } from '../../constants';
import { AntDesign } from "@expo/vector-icons";

const Controls = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
        <View style={styles.controls}>
            <Pressable style={styles.control} onPress={() => {console.log('calendar')}}>
                <Image style={styles.iconLayout} resizeMode="cover" source={require('../../assets/icons/Calendar.png')} />
                <Text style={styles.title}>April, 18</Text>
            </Pressable>
            <Pressable style={styles.control} onPress={() => {console.log('sort')}}>
                <Image style={styles.iconLayout} resizeMode="cover" source={require("../../assets/icons/Sort.png")} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>Time </Text>
                    <AntDesign name="arrowdown" size={15} color="white" />
                </View>
            </Pressable>
            <View style={styles.control}>
                <Switch style={{ height: 24 }} 
                    trackColor={{false: '#253554', true: COLORS.primary}}
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
