import { APPLICATION } from './constants';

const initialState = {
    gettingUser: false,
    getUserError: '',
    user: {},
    gettingCategories: false,
    getCategoriesError: '',
    categories: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION.GET_USER:
            return {
                ...state,
                gettingUser: true,
            };
        case APPLICATION.GET_USER_SUCCESS:
            return {
                ...state,
                gettingUser: false,
                user: action.payload.user
            };
        case APPLICATION.GET_USER_ERROR:
            return {
                ...state,
                gettingUser: false,
                getUserError: action.payload.getUserError
            }
        case APPLICATION.GET_CATEGORIES:
            return {
                ...state,
                gettingUser: true,
            };
        case APPLICATION.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                gettingUser: false,
                categories: action.payload.categories
            };
        case APPLICATION.GET_CATEGORIES_ERROR:
            return {
                ...state,
                gettingUser: false,
                getCategoriesError: action.payload.getCategoriesError
            }
        default:
            return state;
    }
}