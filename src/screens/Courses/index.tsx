import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ScrollView,
} from "react-native";

export default function Courses({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text>Courses Screen</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
