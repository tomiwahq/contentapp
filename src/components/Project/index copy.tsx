import React, { useState } from "react";
import {
    Animated,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch, useSelector } from "react-redux";

import { openProjectAction, closeProjectAction } from "./actions";
import { PROJECT } from "./constants";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const tabBarHeight = 50;

const card = {
    width: new Animated.Value(315),
    height: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    closeViewOpacity: new Animated.Value(0),
    borderRadius: new Animated.Value(14),
    textHeight: new Animated.Value(120),
    textMaskOpacity: new Animated.Value(1),
};

export default props => {
    const projectState = useSelector((state: any) => state.project.state);
    const dispatch = useDispatch();
    const closeProject = () => dispatch(closeProjectAction());
    const openProject = () => dispatch(openProjectAction());

    const openCard = () => {
        if (!props.canOpen || projectState == PROJECT.OPEN) {
            return;
        }
        openProject();
        // setInterval(openProject, 100);

        Animated.spring(card.width, {
            toValue: screenWidth,
        }).start();
        Animated.spring(card.height, {
            toValue: screenHeight - tabBarHeight,
        }).start();
        Animated.spring(card.titleTop, {
            toValue: 40,
        }).start();
        Animated.spring(card.closeViewOpacity, {
            toValue: 1,
        }).start();
        Animated.spring(card.borderRadius, {
            toValue: 0,
        }).start();
        Animated.spring(card.textHeight, {
            toValue: 1000,
        }).start();
        Animated.spring(card.textMaskOpacity, {
            toValue: 0,
        }).start();

        StatusBar.setHidden(true);
    };

    const closeCard = () => {
        if (projectState == PROJECT.CLOSE) {
            return;
        }
        closeProject();
        // setInterval(closeProject, 100);

        Animated.spring(card.width, {
            toValue: 315,
        }).start();
        Animated.spring(card.height, {
            toValue: 460,
        }).start();
        Animated.spring(card.titleTop, {
            toValue: 20,
        }).start();
        Animated.spring(card.closeViewOpacity, {
            toValue: 0,
        }).start();
        Animated.spring(card.borderRadius, {
            toValue: 14,
        }).start();
        Animated.spring(card.textHeight, {
            toValue: 120,
        }).start();
        Animated.spring(card.textMaskOpacity, {
            toValue: 1,
        }).start();

        StatusBar.setHidden(false);
    };

    return (
        <TouchableWithoutFeedback onPress={openCard}>
            <Animated.View
                style={[
                    {
                        width: card.width,
                        height: card.height,
                        borderRadius: card.borderRadius,
                    },
                    styles.container,
                ]}
            >
                <Animated.View
                    style={[
                        {
                            borderTopLeftRadius: card.borderRadius,
                            borderTopRightRadius: card.borderRadius,
                        },
                        styles.cover,
                    ]}
                >
                    <Image style={styles.image} source={props.image} />
                    <Animated.Text
                        style={[{ top: card.titleTop }, styles.title]}
                    >
                        {props.title}
                    </Animated.Text>
                    <Text style={styles.author}>by {props.author}</Text>
                </Animated.View>
                <Animated.Text
                    style={[
                        {
                            height: card.textHeight,
                        },
                        styles.text,
                    ]}
                >
                    {props.text}
                </Animated.Text>
                <AnimatedLinearGradient
                    colors={[
                        "rgba(255, 255, 255, 0.05)",
                        "rgba(255, 255, 255, 1)",
                    ]}
                    style={{
                        position: "absolute",
                        top: 330,
                        width: "100%",
                        height: card.textHeight,
                        opacity: card.textMaskOpacity,
                    }}
                />
                <TouchableOpacity
                    onPress={closeCard}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                    }}
                >
                    <Animated.View
                        opacity={card.closeViewOpacity}
                        style={styles.closeView}
                    >
                        <Ionicons name="ios-close" size={32} color="#546bfb" />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 20,
    },

    cover: {
        height: 290,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    title: {
        position: "absolute",
        left: 20,
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "bold",
        width: 300,
    },

    author: {
        position: "absolute",
        bottom: 20,
        left: 20,
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 15,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    text: {
        fontSize: 17,
        margin: 20,
        lineHeight: 24,
        color: "#3c4560",
    },

    closeView: {
        width: 32,
        height: 32,
        backgroundColor: "#ffffff",
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
});
