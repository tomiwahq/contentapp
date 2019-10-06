import { combineReducers } from "redux";
import menu from "../components/Menu/reducers";
import project from "../components/Project/reducers";
import application from "../Application/reducers";

const IndexReducer = combineReducers({
    menu,
    project,
    application,
});

export default IndexReducer;
