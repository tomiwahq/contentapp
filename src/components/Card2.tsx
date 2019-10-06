import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.cover}>
                <Image style={styles.image} source={props.image} />
                <Image style={styles.logo} source={props.logo} resizeMode="contain" />
                <Text numberOfLines={1} style={styles.subtitle}>{props.subtitle}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                <View style={{ borderRadius: 16, overflow: 'hidden' }}>
                    <Image style={styles.avatar} source={props.avatar} resizeMode="contain" />
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.caption}>{props.caption}</Text>
                    <Text style={styles.author}>{props.author}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: 335,
        borderRadius: 14,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 20,
    },

    cover: {
        width: '100%',
        height: 260,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },

    logo: {
        width: 48,
        height: 48,
        position: 'absolute',
        top: 90,
        left: '50%',
        marginLeft: -24
    },

    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 4,
        marginBottom: 20,
        marginLeft: 20,
        width: '60%',
    },

    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 15,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginTop: 4,
        marginLeft: 20,
    },

    content: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 75,
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },

    wrapper: {
        marginLeft: 10,
        width: '70%',
    },

    caption: {
        color: '#3c4560',
        fontSize: 14,
        fontWeight: '500',
    },

    author: {
        color: '#b8bece',
        fontSize: 13,
        fontWeight: '500',
        marginTop: 4,
    },
})