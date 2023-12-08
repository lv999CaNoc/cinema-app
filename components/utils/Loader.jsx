import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants';

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.white} size={'large'}/>
        </View>
    );
}

export default Loader

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})