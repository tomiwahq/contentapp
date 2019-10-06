import { MENU } from "./constants";

const initialState = {
    action: "",
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MENU.OPEN:
            return {
                ...state,
                action: MENU.OPEN,
            };
        case MENU.CLOSE:
            return {
                ...state,
                action: MENU.CLOSE,
            };
        default:
            return state;
    }
};

export default reducer;
