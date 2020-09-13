import { POSTS } from "./constants";

export const getPostsAction = () => ({
    type: POSTS.GET_POSTS,
});

export const getPostsSuccessAction = ({ data }) => ({
    type: POSTS.GET_POSTS_SUCCESS,
    payload: {
        posts: data,
    },
});

export const getPostsErrorAction = getPostsError => ({
    type: POSTS.GET_POSTS_ERROR,
    payload: {
        getPostsError,
    },
});

export const getPopularPostsAction = () => ({
    type: POSTS.GET_POPULAR_POSTS,
});

export const getPopularPostsSuccessAction = ({ data }) => ({
    type: POSTS.GET_POPULAR_POSTS_SUCCESS,
    payload: {
        popularPosts: data,
    },
});

export const getPopularPostsErrorAction = getPopularPostsError => ({
    type: POSTS.GET_POPULAR_POSTS_ERROR,
    payload: {
        getPopularPostsError,
    },
});

export const getLatestPostsAction = () => ({
    type: POSTS.GET_LATEST_POSTS,
});

export const getLatestPostsSuccessAction = ({ data }) => ({
    type: POSTS.GET_LATEST_POSTS_SUCCESS,
    payload: {
        latestPosts: data,
    },
});

export const getLatestPostsErrorAction = getLatestPostsError => ({
    type: POSTS.GET_LATEST_POSTS_ERROR,
    payload: {
        getLatestPostsError,
    },
});
