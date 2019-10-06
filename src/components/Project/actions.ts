import { PROJECT } from "./constants";

export const openProjectAction = () => ({
    type: PROJECT.OPEN,
});

export const closeProjectAction = () => ({
    type: PROJECT.CLOSE,
});
