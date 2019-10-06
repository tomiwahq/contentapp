import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export const CategoryPill = (props) => (
    <View style={styles.container}>
        <Image style={styles.image} source={props.image == undefined ?
            require('../../assets/logo-react.png') :
            { uri: props.image }} resizeMode="contain" />
        <Text style={styles.text}>{props.text}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 60,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 8,
    },

    image: {
        width: 36,
        height: 36
    },

    text: {
        fontWeight: '600',
        fontSize: 17,
        marginLeft: 8
    },
})