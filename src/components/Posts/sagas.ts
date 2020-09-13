import { takeLeading, put, call, select } from "redux-saga/effects";
import axios from "axios";

import { POSTS } from "./constants";
import {
    getPostsSuccessAction,
    getPostsErrorAction,
    getPopularPostsSuccessAction,
    getPopularPostsErrorAction,
    getLatestPostsSuccessAction,
    getLatestPostsErrorAction,
} from "./actions";

import { API } from "../../includes/api";

// Watcher Saga
export function* watchPosts() {
    // watch for POSTS.GET_POSTS action and run handleGetPosts
    yield takeLeading(POSTS.GET_POSTS, handleGetPosts);
    // watch for POSTS.GET_POPULAR_POSTS action and run handleGetPopularPosts
    yield takeLeading(POSTS.GET_POPULAR_POSTS, handleGetPopularPosts);
    // watch for POSTS.GET_LATEST_POSTS action and run handleGetLatestPosts
    yield takeLeading(POSTS.GET_LATEST_POSTS, handleGetLatestPosts);
}

// GetPosts worker saga
export function* handleGetPosts(action: any) {
    try {
        const postsFromApi = yield call(getPostsFromApi);
        yield put(getPostsSuccessAction(postsFromApi));
    } catch (error) {
        yield put(getPostsErrorAction(error.toString()));
    }
}
// GetPopularPosts worker saga
export function* handleGetPopularPosts(action: any) {
    try {
        const popularPostsFromApi = yield call(getPopularPostsFromApi);
        yield put(getPopularPostsSuccessAction(popularPostsFromApi));
    } catch (error) {
        yield put(getPopularPostsErrorAction(error.toString()));
    }
}

// GetLatestPosts worker saga
export function* handleGetLatestPosts(action: any) {
    try {
        const latestPostsFromApi = yield call(getLatestPostsFromApi);
        yield put(getLatestPostsSuccessAction(latestPostsFromApi));
    } catch (error) {
        yield put(getLatestPostsErrorAction(error.toString()));
    }
}

function getPostsFromApi() {
    return axios.get(API.POSTS).catch(e => {
        throw e;
    });
}

function getPopularPostsFromApi() {
    return axios.get(API.POPULAR_POSTS).catch(e => {
        throw e;
    });
}

function getLatestPostsFromApi() {
    return axios.get(API.LATEST_POSTS).catch(e => {
        throw e;
    });
}
