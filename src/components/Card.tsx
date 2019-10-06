import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.cover}>
                <Image style={styles.image} source={props.image} />
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                <Image style={styles.logo} source={props.logo} resizeMode="contain" />
                <View style={styles.wrapper}>
                    <Text numberOfLines={1} style={styles.caption}>{props.caption}</Text>
                    <Text numberOfLines={1} style={styles.subtitle}>{props.subtitle}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: 315,
        height: 280,
        borderRadius: 14,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 30,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 15,
    },

    cover: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },

    title: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        width: 170,
    },

    content: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
    },

    logo: {
        width: 44,
        height: 44,
    },

    wrapper: {
        marginLeft: 10,
        width: 220,
    },

    caption: {
        color: '#3c4560',
        fontSize: 20,
        fontWeight: '600',
    },

    subtitle: {
        color: '#b8bece',
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 4,
        overflow: 'hidden',
    },
})