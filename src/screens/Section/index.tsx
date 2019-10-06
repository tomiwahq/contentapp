import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Alert,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Section({ navigation }) {
    useEffect(() => {
        StatusBar.setBarStyle("light-content", true);

        return () => {
            StatusBar.setBarStyle("dark-content", true);
        };
    }, []);

    const section = navigation.getParam("section");

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.cover}>
                <Image style={styles.image} source={section.image} />
                <View style={styles.wrapper}>
                    <Image
                        style={styles.logo}
                        source={section.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.subtitle}>{section.subtitle}</Text>
                </View>
                <Text style={styles.title}>{section.title}</Text>
                <Text style={styles.caption}>{section.caption}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    zIndex: 1,
                }}
            >
                <View style={styles.closeView}>
                    <Ionicons name="ios-close" size={36} color="#4775f2" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cover: {
        height: 375,
    },

    closeView: {
        width: 32,
        height: 32,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    },

    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    wrapper: {
        flexDirection: "row",
        position: "absolute",
        top: 40,
        left: 20,
        alignItems: "center",
    },

    logo: {
        width: 24,
        height: 24,
    },

    subtitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "rgba(255, 255, 255, 0.8)",
        marginLeft: 5,
        textTransform: "uppercase",
    },

    title: {
        fontSize: 24,
        color: "#ffffff",
        fontWeight: "bold",
        width: 170,
        position: "absolute",
        top: 78,
        left: 20,
    },

    caption: {
        fontSize: 17,
        color: "#ffffff",
        width: 300,
        position: "absolute",
        bottom: 20,
        left: 20,
    },
});
