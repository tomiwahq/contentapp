import React, { useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function Post({ navigation }) {
    const webViewRef: any = useRef();
    useEffect(() => {
        StatusBar.setBarStyle("light-content", true);

        return () => {
            StatusBar.setBarStyle("dark-content", true);
        };
    }, []);

    const post = navigation.getParam("post");

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.cover}>
                    <Image
                        style={styles.image}
                        source={
                            post.image == undefined
                                ? require("../../../assets/background4.jpg")
                                : { uri: post.image }
                        }
                    />
                    <View style={styles.wrapper}>
                        <Image
                            style={styles.logo}
                            source={
                                post.categoryImage == undefined
                                    ? require("../../../assets/logo-react.png")
                                    : { uri: post.categoryImage }
                            }
                            resizeMode="contain"
                        />
                        <Text style={styles.subtitle}>{post.categoryName}</Text>
                    </View>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.caption}>{post.caption}</Text>
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
                <View style={styles.content}>
                    <WebView
                        source={{ html: post.description + htmlStyles }}
                        scalesPageToFit={false}
                        scrollEnabled={false}
                        ref={webViewRef}
                        onNavigationStateChange={event => {
                            if (event.url != "about:blank") {
                                // console.log(webViewRef);
                                //webViewRef.webview.stopLoading();
                                Linking.openURL(event.url);
                            }
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const htmlStyles = `
    <style>
        * {
            font-family: -apple-system, Roboto;
            margin: 0;
            padding: 0;
            line-height: 27px;
            font-size: 17px;
            font-weight: normal;
            color: #3c4560;

        }

        h1, h2, h3, h4, h5, h6 {
            color: #b8bece;
        }

        p {
            margin-top: 20px;
        }

        a {
            color: #4775f2;
            font-weight: 600;
            text-decoration: none;
        }

        img {
            width: 100%;
            border-radius: 10px;
            margin-top: 20px;
        }

        pre {
            padding: 20px;
            background: #212c4f;
            overflow: hidden;
            word-wrap: break-word;
            border-radius: 10px;
            margin-top: 20px;
            color: #ffffff;
        }

        code {
            color: #ffffff;
        }

    </style>
`;

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
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },

    title: {
        fontSize: 24,
        color: "#ffffff",
        fontWeight: "bold",
        width: 170,
        position: "absolute",
        top: 78,
        left: 20,
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },

    caption: {
        fontSize: 17,
        color: "#ffffff",
        width: 300,
        position: "absolute",
        bottom: 20,
        left: 20,
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },

    content: {
        height: 1000,
        width: "100%",
        padding: 20,
    },
});
