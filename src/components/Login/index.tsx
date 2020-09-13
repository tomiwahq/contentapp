import React, { useState, useEffect } from "react";
import {
    Animated,
    Dimensions,
    Alert,
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import Success from "../Success";
import Loading from "../Loading";

import { closeLoginAction } from "./actions";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "./constants";

const screenHeightFromDimension = Dimensions.get("window").height;
const scale = new Animated.Value(1.3);
const translateY = new Animated.Value(0);

export default props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [iconEmail, setIconEmail] = useState(
        require("../../../assets/icon-email.png")
    );
    const [iconPassword, setIconPassword] = useState(
        require("../../../assets/icon-password.png")
    );
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const login = useSelector((state: any) => state.login);
    const dispatch = useDispatch();
    const closeLogin = () => dispatch(closeLoginAction());
    const [screenHeight, setScreenHeight] = useState(screenHeightFromDimension);

    useEffect(() => {
        const adaptScreenHeight = dimensions => {
            setScreenHeight(dimensions.window.height);
        };

        Dimensions.addEventListener("change", adaptScreenHeight);

        // clean up
        return () =>
            Dimensions.removeEventListener("change", adaptScreenHeight);
    }, []);

    const top = new Animated.Value(screenHeight);

    useEffect(() => {
        if (login.action == LOGIN.OPEN) {
            Animated.timing(top, {
                toValue: 0,
                duration: 0,
            }).start();
            Animated.spring(scale, { toValue: 1 }).start();
            Animated.timing(translateY, { toValue: 0, duration: 0 }).start();
        }

        if (login.action == LOGIN.CLOSE) {
            Animated.timing(top, {
                toValue: screenHeight,
                delay: 500,
                duration: 0,
            }).start();
            Animated.spring(scale, { toValue: 1.3 }).start();
            Animated.timing(translateY, {
                toValue: screenHeight,
                duration: 500,
            }).start();
        }
    }, [login.action]);

    const handleLogin = () => {
        console.log("email: ", email);
        console.log("password: ", password);
        setIsLoading(true);

        setTimeout(() => {
            setIsSuccessful(true);
            setIsLoading(false);

            Alert.alert("Congrats", "You're successfully logged in");
            setTimeout(() => {
                setIsSuccessful(false);
                closeLogin();
            }, 2000);
        }, 2000);
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    top: top,
                },
            ]}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    closeLogin();
                }}
            >
                <BlurView
                    tint="default"
                    intensity={100}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[
                    styles.modal,
                    {
                        transform: [
                            { scale: scale },
                            { translateY: translateY },
                        ],
                    },
                ]}
            >
                <Image
                    style={styles.logo}
                    source={require("../../../assets/logo-react.png")}
                />
                <Text style={styles.text}>Login to access premium content</Text>
                <TextInput
                    value={email}
                    onChangeText={email => setEmail(email)}
                    placeholder="Email"
                    style={styles.textInput}
                    keyboardType="email-address"
                    onFocus={() =>
                        setIconEmail(
                            require("../../../assets/icon-email-animated.gif")
                        )
                    }
                    onBlur={() =>
                        setIconEmail(require("../../../assets/icon-email.png"))
                    }
                />
                <TextInput
                    value={password}
                    onChangeText={password => setPassword(password)}
                    placeholder="Password"
                    style={styles.textInput}
                    secureTextEntry={true}
                    onFocus={() =>
                        setIconPassword(
                            require("../../../assets/icon-password-animated.gif")
                        )
                    }
                    onBlur={() =>
                        setIconPassword(
                            require("../../../assets/icon-password.png")
                        )
                    }
                />
                <Image style={styles.iconEmail} source={iconEmail} />
                <Image style={styles.iconPassword} source={iconPassword} />
                <TouchableOpacity onPress={handleLogin}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <Success isActive={isSuccessful} />
            <Loading isActive={isLoading} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0, 0.75)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: 335,
        height: 370,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 40,
        elevation: 40,
        alignItems: "center",
    },

    logo: {
        width: 44,
        height: 44,
        marginTop: 50,
    },

    text: {
        marginTop: 20,
        fontSize: 13,
        fontWeight: "600",
        textTransform: "uppercase",
        width: 160,
        textAlign: "center",
        color: "#b8bece",
    },

    textInput: {
        borderStyle: "solid",
        borderColor: "#dbdfea",
        borderWidth: 1,
        width: 295,
        height: 44,
        borderRadius: 10,
        fontSize: 17,
        color: "#3c4560",
        marginTop: 20,
        paddingLeft: 44,
    },

    iconEmail: {
        width: 24,
        height: 16,
        position: "absolute",
        top: 181,
        left: 31,
    },

    iconPassword: {
        width: 18,
        height: 24,
        position: "absolute",
        top: 241,
        left: 33,
    },

    button: {
        backgroundColor: "#5263ff",
        width: 295,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#c2cbff",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        elevation: 20,
        margin: 20,
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});
