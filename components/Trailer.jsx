import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const Trailer = ({movieUri}) => {
    const video = React.useRef(null);
    const [status, setStatus] = useState({});

    return (
        <View >
            <TouchableOpacity style={styles.container} onPress={() => {
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }}>
                <Video
                    ref={video}
                    source={{ uri: movieUri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    useNativeControls={false}
                    style={{ flex: 1 }}
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                {status.isPlaying ? ('') : (
                    <View style={styles.playButton}>
                        <Ionicons style={styles.playIcon1} name="play" size={24} color={COLORS.icon} />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Trailer

const styles = StyleSheet.create({
    container: {
        height: 210,
        marginBottom: SIZES.xxSmall,
        width: SIZES.width
    },
    playIcon1: {
        width: 24,
        height: 24,
        overflow: "hidden"
    },
    playButton: {
        position: "absolute",
        top: 73,
        left: 156,
        borderRadius: 80,
        backgroundColor: "#353B41",
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    videoIcon: {
        flex: 1,
        width: "100%",
        height: 210,
        overflow: "hidden"
    }
})