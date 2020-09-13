import { POSTS } from "./constants";

const initialState = {
    gettingPosts: false,
    getPostsError: "",
    posts: [],
    gettingPopularPosts: false,
    getPopularPostsError: "",
    popularPosts: [],
    gettingLatestPosts: false,
    getLatestPostsError: "",
    latestPosts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POSTS.GET_POSTS:
            return {
                ...state,
                gettingPosts: true,
            };
        case POSTS.GET_POSTS_SUCCESS:
            return {
                ...state,
                gettingPosts: false,
                posts: action.payload.posts,
            };
        case POSTS.GET_POSTS_ERROR:
            return {
                ...state,
                gettingPosts: false,
                getPostsError: action.payload.getPostsError,
            };
        case POSTS.GET_POPULAR_POSTS:
            return {
                ...state,
                gettingPopularPosts: true,
            };
        case POSTS.GET_POPULAR_POSTS_SUCCESS:
            return {
                ...state,
                gettingPopularPosts: false,
                popularPosts: action.payload.popularPosts,
            };
        case POSTS.GET_POPULAR_POSTS_ERROR:
            return {
                ...state,
                gettingPosts: false,
                getPopularPostsError: action.payload.getPopularPostsError,
            };
        case POSTS.GET_LATEST_POSTS:
            return {
                ...state,
                gettingLatestPosts: true,
            };
        case POSTS.GET_LATEST_POSTS_SUCCESS:
            return {
                ...state,
                gettingLatestPosts: false,
                latestPosts: action.payload.latestPosts,
            };
        case POSTS.GET_LATEST_POSTS_ERROR:
            return {
                ...state,
                gettingLatestPosts: false,
                getLatestPostsError: action.payload.getLatestPostsError,
            };
        default:
            return state;
    }
};
