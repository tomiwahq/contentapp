import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';

export default function Settings({navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <Text>SETTINGS</Text>
                <Button
                    title="Go back Home"
                    onPress={() => navigation.navigate('Home')}
                />
                <Text>{navigation.getParam('passed', 'Tomiwa')}</Text>
            </View>
        </View>
    );
}

Settings.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('passed', 'Tomiwa')
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
