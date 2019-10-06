import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ScrollView,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    Easing,
    StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Card from "../../components/Card";
import { CategoryPill } from "../../components/CategoryPill";
import Card2 from "../../components/Card2";
import Menu from "../../components/Menu";
import { MENU } from "../../components/Menu/constants";
import { openMenuAction } from "../../components/Menu/actions";
import LoginModal from "../../components/LoginModal";

const scale = new Animated.Value(1);
const opacity = new Animated.Value(1);

export default function Home({ navigation }) {
    const menu = useSelector((store: any) => store.menu);
    const application = useSelector((store: any) => store.application);
    const dispatch = useDispatch();
    const openMenu = () => dispatch(openMenuAction());

    useEffect(() => {
        StatusBar.setBarStyle("dark-content", true);
    }, []);

    useEffect(() => {
        toggleMenu();
    }, [menu.action]);

    const toggleMenu = () => {
        if (menu.action == MENU.OPEN) {
            Animated.timing(scale, {
                toValue: 0.9,
                duration: 300,
                // easing: Easing.in()
            }).start();
            Animated.spring(opacity, {
                toValue: 0.5,
            }).start();
            StatusBar.setBarStyle("light-content", true);
        }

        if (menu.action == MENU.CLOSE) {
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                // easing: Easing.in()
            }).start();
            Animated.spring(opacity, {
                toValue: 1,
            }).start();
            StatusBar.setBarStyle("dark-content", true);
        }
    };

    return (
        <View style={styles.rootView}>
            <Menu />
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            {
                                scale: scale,
                            },
                        ],
                        opacity: opacity,
                    },
                ]}
            >
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.titleBar}>
                            <TouchableOpacity
                                onPress={openMenu}
                                style={{
                                    marginLeft: 20,
                                }}
                            >
                                <Image
                                    style={styles.avatar}
                                    source={
                                        application.user.photo == undefined
                                            ? require("../../../assets/avatar-default.jpg")
                                            : { uri: application.user.photo }
                                    }
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    marginLeft: 20,
                                }}
                            >
                                <Text style={styles.title}>Welcome back,</Text>
                                <Text style={styles.name}>
                                    {application.user.name == undefined
                                        ? "Loading..."
                                        : `${application.user.name} ${application.user.surname}`}
                                </Text>
                            </View>
                            <Ionicons
                                name="ios-notifications"
                                size={32}
                                color="#4775f2"
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    top: 5,
                                }}
                            />
                        </View>
                        <ScrollView
                            style={{ flexDirection: "row", paddingLeft: 12 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {application.categories.map((category, index) => (
                                <CategoryPill
                                    key={index}
                                    image={category.image}
                                    text={category.name}
                                />
                            ))}
                        </ScrollView>
                        <Text style={styles.subtitle}>Continue Reading</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {cards.map((card, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        navigation.push("Section", {
                                            section: card,
                                        })
                                    }
                                >
                                    <Card
                                        title={card.title}
                                        image={card.image}
                                        logo={card.logo}
                                        caption={card.caption}
                                        subtitle={card.subtitle}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={styles.subtitle}>Popular Courses</Text>
                        {card2s.map((card2, index) => (
                            <Card2
                                key={index}
                                image={card2.image}
                                title={card2.title}
                                subtitle={card2.subtitle}
                                logo={card2.logo}
                                author={card2.author}
                                avatar={card2.avatar}
                                caption={card2.caption}
                            />
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Animated.View>
            <LoginModal />
        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#000000",
    },

    container: {
        flex: 1,
        backgroundColor: "#f0f3f5",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },

    title: {
        fontSize: 14,
        color: "#b8bece",
    },

    name: {
        fontSize: 18,
        color: "#3c4560",
        fontWeight: "bold",
    },

    titleBar: {
        width: "100%",
        marginTop: 50,
        flexDirection: "row",
    },

    subtitle: {
        color: "#b8bece",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 20,
        textTransform: "uppercase",
    },

    avatar: {
        width: 44,
        height: 44,
        backgroundColor: "#555555",
        borderRadius: 22,
    },
});

const logos = [
    {
        image: require("../../../assets/logo-framerx.png"),
        text: "Framer X",
    },
    {
        image: require("../../../assets/logo-figma.png"),
        text: "Figma",
    },
    {
        image: require("../../../assets/logo-react.png"),
        text: "React",
    },
    {
        image: require("../../../assets/logo-studio.png"),
        text: "Studio",
    },
    {
        image: require("../../../assets/logo-swift.png"),
        text: "Swift",
    },
    {
        image: require("../../../assets/logo-sketch.png"),
        text: "Sketch",
    },
];

const cards = [
    {
        title: "React Native for Designers 1",
        image: require("../../../assets/background5.jpg"),
        subtitle: "React Native 1",
        caption: "1 of 6 Sections",
        logo: require("../../../assets/logo-react.png"),
    },
    {
        title: "React Native for Designers 2",
        image: require("../../../assets/background11.jpg"),
        subtitle: "React Native 2",
        caption: "2 of 6 Sections",
        logo: require("../../../assets/logo-figma.png"),
    },
    {
        title: "React Native for Designers 3",
        image: require("../../../assets/background13.jpg"),
        subtitle: "React Native 3",
        caption: "3 of 6 Sections",
        logo: require("../../../assets/logo-vue.png"),
    },
    {
        title: "React Native for Designers 4",
        image: require("../../../assets/background16.jpg"),
        subtitle: "React Native 4",
        caption: "4 of 6 Sections",
        logo: require("../../../assets/logo-framerx.png"),
    },
];

const card2s = [
    {
        title: "Prototype in InVision Studio",
        subtitle: "10 sections",
        image: require("../../../assets/background2.jpg"),
        logo: require("../../../assets/logo-studio.png"),
        author: "Tomiwa Ibiwoye",
        avatar: require("../../../assets/avatar.jpg"),
        caption: "Design and Interactive prototype",
    },
    {
        title: "Design in React",
        subtitle: "12 sections",
        image: require("../../../assets/background4.jpg"),
        logo: require("../../../assets/logo-react.png"),
        author: "Tomiwa Ibiwoye",
        avatar: require("../../../assets/avatar.jpg"),
        caption: "Components mean a lot",
    },
    {
        title: "Prototype in Figma",
        subtitle: "8 sections",
        image: require("../../../assets/background6.jpg"),
        logo: require("../../../assets/logo-figma.png"),
        author: "Tomiwa Ibiwoye",
        avatar: require("../../../assets/avatar.jpg"),
        caption: "Design and Interactive prototype",
    },
    {
        title: "Why Vue",
        subtitle: "10 sections",
        image: require("../../../assets/background8.jpg"),
        logo: require("../../../assets/logo-vue.png"),
        author: "Tomiwa Ibiwoye",
        avatar: require("../../../assets/avatar.jpg"),
        caption: "I'll stick to React",
    },
    {
        title: "What is Framer X",
        subtitle: "5 sections",
        image: require("../../../assets/background10.jpg"),
        logo: require("../../../assets/logo-framerx.png"),
        author: "Tomiwa Ibiwoye",
        avatar: require("../../../assets/avatar.jpg"),
        caption: "I literally have no idea what it is",
    },
];
