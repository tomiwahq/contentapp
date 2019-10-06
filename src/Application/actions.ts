import { APPLICATION } from './constants';

export const getUserAction = () => ({
    type: APPLICATION.GET_USER,
})

export const getUserSuccessAction = ({ data }) => ({
    type: APPLICATION.GET_USER_SUCCESS,
    payload: {
        user: data
    },
})

export const getUserErrorAction = (getUserError) => ({
    type: APPLICATION.GET_USER_ERROR,
    payload: {
        getUserError,
    },
})

export const getCategoriesAction = () => ({
    type: APPLICATION.GET_CATEGORIES,
})

export const getCategoriesSuccessAction = ({ data }) => ({
    type: APPLICATION.GET_CATEGORIES_SUCCESS,
    payload: {
        categories: data
    },
})

export const getCategoriesErrorAction = (getCategoriesError) => ({
    type: APPLICATION.GET_CATEGORIES_ERROR,
    payload: {
        getCategoriesError,
    },
})