import { LOGIN } from "./constants";

const initialState = {
    action: "",
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN.OPEN:
            return {
                ...state,
                action: LOGIN.OPEN,
            };
        case LOGIN.CLOSE:
            return {
                ...state,
                action: LOGIN.CLOSE,
            };
        default:
            return state;
    }
};

export default reducer;
