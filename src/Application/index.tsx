import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation';
import { getUserAction, getCategoriesAction } from './actions';

export default function Application() {
    // const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const getUser = () => dispatch(getUserAction());
    const getCategories = () => dispatch(getCategoriesAction());

    useEffect(() => {
        getUser();
        getCategories();
    }, [])

    return (
        <Navigation />
    );
}
