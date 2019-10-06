import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
    set,
    cond,
    eq,
    spring,
    startClock,
    stopClock,
    clockRunning,
    defined,
    Value,
    Clock,
    event
} = Animated;

let translateX: Animated.Node<number> = new Value(0);
let translateY: Animated.Node<number> = new Value(0);

const state = new Value(-1);
const dragX = new Value(0);
const dragVX = new Value(0);
const dragY = new Value(0);
const dragVY = new Value(0);

const onGestureEvent = event([
    {
        nativeEvent: {
            translationX: dragX,
            velocityX: dragVX,
            translationY: dragY,
            velocityVY: dragVY,
            state: state
        }
    }
])

const clock = new Clock();
const transX: Animated.Value<number> = new Value();
translateX = cond(eq(state, State.ACTIVE), [
    stopClock(clock),
    set(transX, dragX),
    transX
], [
    set(transX, cond(
        defined(transX), runSpring(clock, transX, dragVX, 0), 0
    )),
    transX
])
const transY: Animated.Value<number> = new Value();
translateY = cond(eq(state, State.ACTIVE), [
    stopClock(clock),
    set(transY, dragY),
    transY
], [
    set(transY, cond(
        defined(transY), runSpring(clock, transY, dragVY, 0), 0
    )),
    transY
])

export default function ReanimatedXY() {
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
            onHandlerStateChange={onGestureEvent}
        >
            <Animated.View style={[styles.box, {
                transform: [{ translateX: translateX, translateY: translateY }]
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

function runSpring(clock: Animated.Clock, value: Animated.Adaptable<number>, velocity: number | Animated.Value<0> | Animated.Node<number> | readonly (number | Animated.Node<number> | readonly (number | Animated.Node<number>)[])[], dest: Animated.Adaptable<number>) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };

    const config = {
        damping: 7,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0),
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, velocity),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ];
}