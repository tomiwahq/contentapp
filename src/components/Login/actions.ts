import { LOGIN } from "./constants";

export const openLoginAction = () => ({
    type: LOGIN.OPEN,
});

export const closeLoginAction = () => ({
    type: LOGIN.CLOSE,
});
