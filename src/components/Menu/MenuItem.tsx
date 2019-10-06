import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default (props) => (
    <View style={styles.container}>
        <View style={styles.iconView}>
            <Ionicons name={props.icon} size={24} color="#546bfb" />
        </View>
        <View style={styles.content}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    </ View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 0,
    },

    iconView: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // TODO: May remove if not needed
    },

    content: {
        paddingLeft: 20,
    },

    title: {
        color: '#3c4560',
        fontSize: 24,
        fontWeight: '600',
    },

    text: {
        color: '#3c4560',
        fontWeight: '600',
        opacity: 0.6,
        marginTop: 0,
    },
})