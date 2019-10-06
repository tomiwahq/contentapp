import React, { useEffect } from 'react';
import { Animated, Dimensions, TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import MenuItem from './MenuItem';
import { closeMenuAction } from './actions';
import { MENU } from './constants';

const screenHeight = Dimensions.get('window').height;
const top = new Animated.Value(screenHeight);

export default () => {
    const menu = useSelector((state: any) => state.menu);
    const application = useSelector((store: any) => store.application);
    const dispatch = useDispatch();
    const closeMenu = () => dispatch(closeMenuAction());

    useEffect(() => {
        toggleMenu();
    }, [menu.action]);

    const toggleMenu = () => {
        if (menu.action == MENU.OPEN) {
            Animated.spring(top, {
                toValue: 54,
            }).start();
        }

        if (menu.action == MENU.CLOSE) {
            Animated.spring(top, {
                toValue: screenHeight,
            }).start();
        }
    };

    return (
        <Animated.View style={[styles.container, { top: top }]}>
            <View style={styles.cover}>
                <Image style={styles.image} source={require('../../../assets/background2.jpg')} />
                <Text style={styles.title}>
                    {
                        application.user.name == undefined ?
                            'Loading...' :
                            `${application.user.name} ${application.user.surname}`
                    }
                </Text>
                <Text style={styles.subtitle}>
                    {
                        application.user.email == undefined ?
                            'Loading...' :
                            application.user.email
                    }
                </Text>
            </View>
            <TouchableOpacity
                onPress={closeMenu}
                style={{
                    position: 'absolute',
                    top: 120,
                    left: '50%',
                    marginLeft: -22,
                    zIndex: 1
                }}
            >
                <View style={styles.closeView}>
                    <Ionicons name="ios-close" size={44} color="#546bfb" />
                </View>
            </TouchableOpacity>
            <View style={styles.content}>
                {
                    items.map((item, index) => (
                        <MenuItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            text={item.text}
                        />
                    ))
                }
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        zIndex: 100,
        borderRadius: 10,
        overflow: 'hidden',
    },

    cover: {
        height: 142,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
    },

    subtitle: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 13,
        marginTop: 8,
    },

    closeView: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    },

    content: {
        height: screenHeight,
        backgroundColor: '#f0f3f5',
        padding: 50,
    },
})

const items = [
    {
        icon: 'ios-settings',
        title: 'Account',
        text: 'settings',
    },
    {
        icon: 'ios-card',
        title: 'Billing',
        text: 'payments',
    },
    {
        icon: 'ios-compass',
        title: 'Learn to code',
        text: 'start course',
    },
    {
        icon: 'ios-exit',
        title: 'Log out',
        text: 'see you soon!',
    },
]