import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const screenHeight = Dimensions.get("window").height;

let animation;
const top = new Animated.Value(screenHeight);
const opacity = new Animated.Value(0);
export default props => {
    useEffect(() => {
        if (props.isActive) {
            Animated.timing(top, {
                toValue: 0,
                duration: 0,
            }).start();
            Animated.timing(opacity, {
                toValue: 1,
            }).start();
            animation.play();
        } else {
            Animated.timing(top, {
                toValue: screenHeight,
                duration: 0,
            }).start();
            Animated.timing(opacity, {
                toValue: 1,
            }).start();
        }
    }, [props.isActive]);
    return (
        <Animated.View
            style={[
                styles.container,
                {
                    top: top,
                    opacity: opacity,
                },
            ]}
        >
            <LottieView
                source={require("../../assets/lottie-checked-done.json")}
                autoPlay={false}
                loop={false}
                ref={anima => {
                    animation = anima;
                }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        elevation: 41, // needed for android
    },
});
