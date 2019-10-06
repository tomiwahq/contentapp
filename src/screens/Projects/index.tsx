import React, { useState, useEffect } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ScrollView,
} from "react-native";
import Project from "../../components/Project";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { PROJECT } from "../../components/Project/constants";

const maskOpacity = new Animated.Value(0);

export default function Projects({ navigation }) {
    const projectState = useSelector((state: any) => state.project.state);

    const [activeIndex, setActiveIndex] = useState(0);

    const translateX = new Animated.Value(0);
    const translateY = new Animated.Value(0);
    const scale = new Animated.Value(0.9);
    const cardDrop = new Animated.Value(44);
    const scale2 = new Animated.Value(0.8);
    const cardDrop2 = new Animated.Value(0);
    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: true }
    );

    const stateBeganTransition = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        Animated.spring(cardDrop, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
        Animated.spring(scale2, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
        Animated.spring(cardDrop2, {
            toValue: 44,
            useNativeDriver: true,
        }).start();
        Animated.timing(maskOpacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const stateActiveTransition = () => {
        Animated.spring(translateX, releaseData).start();
        Animated.spring(translateY, releaseData).start();
    };

    const stateEndTransition = () => {
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
        Animated.spring(cardDrop, {
            toValue: 44,
            useNativeDriver: true,
        }).start();
        Animated.spring(scale2, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
        Animated.spring(cardDrop2, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(maskOpacity, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const geStyles = [
        {
            transform: [
                { scale: 1 },
                { translateX: translateX },
                { translateY: translateY },
            ],
        },
        {
            transform: [{ scale }, { translateY: cardDrop }],
        },
        {
            transform: [{ scale: scale2 }, { translateY: cardDrop2 }],
        },
    ];

    const releaseData = {
        damping: 7,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: 0,
        useNativeDriver: true,
    };

    useEffect(() => {
        stateEndTransition();
    }, [projectState]);

    const onHandlerStateChange = event => {
        const projectCardTranslationY = event.nativeEvent.translationY;
        if (projectCardTranslationY > 200) {
            Animated.spring(translateY, {
                toValue: 1000,
                useNativeDriver: true,
            }).start();
            Animated.timing(maskOpacity, {
                toValue: 0,
                useNativeDriver: true,
            }).start();

            setTimeout(
                () => setActiveIndex((activeIndex + 1) % projects.length),
                100
            );
        } else {
            if (event.nativeEvent.state == State.BEGAN) {
                stateBeganTransition();
            }

            if (event.nativeEvent.oldState == State.ACTIVE) {
                stateActiveTransition();
            }
            if (event.nativeEvent.state == State.END) {
                stateEndTransition();
            }
        }
    };

    const getApplyIndex = (index: number) => {
        let x = index - activeIndex;
        if (x < 0) {
            return projects.length + x;
        }
        return x;
    };
    return (
        <View style={styles.container}>
            <Animated.View style={styles.mask} opacity={maskOpacity} />
            {projects.map((project, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <PanGestureHandler
                            onGestureEvent={
                                getApplyIndex(index) == 0 &&
                                projectState == PROJECT.CLOSE
                                    ? onGestureEvent
                                    : Animated.event([])
                            }
                            onHandlerStateChange={
                                getApplyIndex(index) == 0 &&
                                projectState == PROJECT.CLOSE
                                    ? onHandlerStateChange
                                    : () => {}
                            }
                        >
                            <Animated.View
                                style={[
                                    {
                                        zIndex: 0 - getApplyIndex(index),
                                        transform: [{ scale: 0.5 }],
                                    },
                                    geStyles[getApplyIndex(index)],
                                ]}
                            >
                                <Project
                                    canOpen={
                                        getApplyIndex(index) == 0 ? true : false
                                    }
                                    title={project.title}
                                    image={project.image}
                                    author={project.author}
                                    text={project.text}
                                />
                            </Animated.View>
                        </PanGestureHandler>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f3f5",
    },

    mask: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: -3,
    },
});

const projects = [
    {
        title: "Price Tag",
        image: require("../../../assets/background5.jpg"),
        author: "Tomiwa Ibiwoye",
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde accusantium, aperiam harum eos consectetur optio atque laudantium libero dolores voluptatibus quisquam fugit est 1 voluptatum. Iusto laboriosam blanditiis autem repudiandae cumque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde accusantium, aperiam harum eos consectetur optio atque laudantium libero dolores voluptatibus quisquam fugit est 1 voluptatum. Iusto laboriosam blanditiis autem repudiandae cumque!",
    },
    {
        title: "Index Prague",
        image: require("../../../assets/background13.jpg"),
        author: "Mobayo Nle",
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde accusantium, aperiam harum eos consectetur optio atque laudantium libero dolores voluptatibus quisquam fugit est 2 voluptatum. Iusto laboriosam blanditiis autem repudiandae cumque!",
    },
    {
        title: "Lokey Li",
        image: require("../../../assets/background7.jpg"),
        author: "Joseph Mayowa",
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde accusantium, aperiam harum eos consectetur optio atque laudantium libero dolores voluptatibus quisquam fugit est 3 voluptatum. Iusto laboriosam blanditiis autem repudiandae cumque!",
    },
    {
        title: "Kilan Ko",
        image: require("../../../assets/background11.jpg"),
        author: "Madison Valory",
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde accusantium, aperiam harum eos consectetur optio atque laudantium libero dolores voluptatibus quisquam fugit est 4 voluptatum. Iusto laboriosam blanditiis autem repudiandae cumque!",
    },
    {
        title: "Frepe Teh",
        image: require("../../../assets/background2.jpg"),
        author: "Vince Lombardi",
        text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde accusantium, aperiam harum eos consectetur optio atque laudantium libero dolores voluptatibus quisquam fugit est 5 voluptatum. Iusto laboriosam blanditiis autem repudiandae cumque!",
    },
];
