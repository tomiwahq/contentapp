import { PROJECT } from "./constants";

const initialState = {
    state: PROJECT.CLOSE,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PROJECT.OPEN:
            return {
                ...state,
                state: PROJECT.OPEN,
            };
        case PROJECT.CLOSE:
            return {
                ...state,
                state: PROJECT.CLOSE,
            };
        default:
            return state;
    }
};

export default reducer;
