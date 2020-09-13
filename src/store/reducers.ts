import { combineReducers } from "redux";
import menu from "../components/Menu/reducers";
import login from "../components/Login/reducers";
import project from "../components/Project/reducers";
import application from "../Application/reducers";
import posts from "../components/Posts/reducers";

const IndexReducer = combineReducers({
    menu,
    login,
    project,
    application,
    posts,
});

export default IndexReducer;
