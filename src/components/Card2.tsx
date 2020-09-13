import React, { useState, useEffect } from "react";
import { Dimensions, View, StyleSheet, Image, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

const calculateCard2Width = (screenWidth: number) => {
    let card2Width = screenWidth - 40;

    if (screenWidth >= 768) {
        card2Width = (screenWidth - 60) / 2;
    }

    if (screenWidth >= 1024) {
        card2Width = (screenWidth - 80) / 3;
    }
    
    return card2Width;
};

export default props => {
    const [card2Width, setCard2Width] = useState(
        calculateCard2Width(screenWidth)
    );

    useEffect(() => {
        const adaptLayout = dimensions => {
            setCard2Width(calculateCard2Width(dimensions.window.width));
        };

        Dimensions.addEventListener("change", adaptLayout);

        // clean up
        return () => Dimensions.removeEventListener("change", adaptLayout);
    }, []);

    return (
        <View style={[styles.container, { width: card2Width }]}>
            <View style={styles.cover}>
                <Image
                    style={styles.image}
                    source={
                        props.image == undefined
                            ? require("../../assets/background4.jpg")
                            : { uri: props.image }
                    }
                />
                <Image
                    style={styles.logo}
                    source={
                        props.logo == undefined
                            ? require("../../assets/logo-react.png")
                            : { uri: props.logo }
                    }
                    resizeMode="contain"
                />
                <Text numberOfLines={1} style={styles.subtitle}>
                    {props.subtitle}
                </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                <View style={{ borderRadius: 16, overflow: "hidden" }}>
                    <Image
                        style={styles.avatar}
                        source={props.avatar}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.caption}>{props.caption}</Text>
                    <Text style={styles.author}>{props.author}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: 335,
        borderRadius: 14,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 20,
    },

    cover: {
        width: "100%",
        height: 260,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: "hidden",
        justifyContent: "flex-end",
    },

    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },

    logo: {
        width: 48,
        height: 48,
        position: "absolute",
        top: 90,
        left: "50%",
        marginLeft: -24,
    },

    title: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "600",
        marginTop: 4,
        marginBottom: 20,
        marginLeft: 20,
        width: "60%",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },

    subtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 15,
        fontWeight: "500",
        textTransform: "uppercase",
        marginTop: 4,
        marginLeft: 20,
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },

    content: {
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        height: 75,
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },

    wrapper: {
        marginLeft: 10,
        width: "70%",
    },

    caption: {
        color: "#3c4560",
        fontSize: 14,
        fontWeight: "500",
    },

    author: {
        color: "#b8bece",
        fontSize: 13,
        fontWeight: "500",
        marginTop: 4,
    },
});
