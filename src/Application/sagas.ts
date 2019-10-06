import { takeLeading, put, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { APPLICATION } from './constants';
import {
    getUserSuccessAction,
    getUserErrorAction,
    getCategoriesSuccessAction,
    getCategoriesErrorAction
} from './actions';

// Watcher Saga
export function* watchApplication() {
    // watch for APPLICATION.GET_USER action and run handleGetUser
    yield takeLeading(APPLICATION.GET_USER, handleGetUser);
    // watch for APPLICATION.GET_CATEGORIES action and run handleGetCategories
    yield takeLeading(APPLICATION.GET_CATEGORIES, handleGetCategories);
}

// GetUser worker saga
export function* handleGetUser(action: any) {
    try {
        const userFromApi = yield call(getUserFromApi);
        yield put(getUserSuccessAction(userFromApi));
    } catch (error) {
        yield put(getUserErrorAction(error.toString()));
    }

}

function getUserFromApi() {
    return axios.get('https://uinames.com/api/?ext')
        .catch(e => { throw e })
}

// GetUser worker saga
export function* handleGetCategories(action: any) {
    try {
        const categoriesFromApi = yield call(getCategoriesFromApi);
        yield put(getCategoriesSuccessAction(categoriesFromApi));
    } catch (error) {
        yield put(getCategoriesErrorAction(error.toString()));
    }

}

function getCategoriesFromApi() {
    return axios.get('https://contentapp.apps.teraboxx.com/index.php/api/categories')
        .catch(e => { throw e })
}