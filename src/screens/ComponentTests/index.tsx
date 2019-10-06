import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import RNAnimated from './RNAnimated';
import Reanimated from './Reanimated';

function ComponentTests({ navigation }) {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Button
                title="Update the title"
                onPress={() => navigation.setParams({ navTitle: 'Updated!' })}
            />
            <View style={styles.block}>
                <Text style={styles.blockTitle}>React Native Animated</Text>
                <RNAnimated />
            </View>
            <View style={styles.block}>
                <Text style={styles.blockTitle}>React Native Reanimated</Text>
                <Reanimated />
            </View>
            <View style={styles.block}>
                <Text style={styles.blockTitle}>Pending</Text>
                <Text>{navigation.getParam('passed', 'Tomiwa')}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.blockTitle}>Pending</Text>
                <Text>{navigation.getParam('passed', 'Tomiwa')}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.blockTitle}>Pending</Text>
                <Text>{navigation.getParam('passed', 'Tomiwa')}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: "solid",
        borderColor: "#3e3e3e",
        borderWidth: 10,
        height: 250,
    },
    blockTitle: {
        position: "absolute",
        top: 10,
        left: 10,
        textTransform: "uppercase",
    }
});


export default ComponentTests;