import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { PanGestureHandler, State } from 'react-native-gesture-handler';

const translateX = new Animated.Value(0);

const onGestureEvent = Animated.event([
    {
        nativeEvent: {
            translationX: translateX
        }
    }
], { useNativeDriver: true })

const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
        Animated.timing(
            translateX,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }
        ).start()
    }
}

export default function RNAnimated() {
    // useEffect(() => {
    //     setInterval(() => {
    //         for (let i = 0; i < 500; i++) {
    //             console.log('block js thread')
    //         }
    //     }, 1000)

    // }, [])

    return (
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
        >
            <Animated.View style={[styles.box, {
                transform: [{ translateX: translateX }]
            }]} />
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 80,
        width: 80,
        backgroundColor: 'cyan',
    }
})