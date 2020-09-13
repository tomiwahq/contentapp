import { all } from "redux-saga/effects";
import { watchApplication } from "../Application/sagas";
import { watchPosts } from "../components/Posts/sagas";

// Root watcher saga
export default function* IndexSaga() {
    yield all([watchApplication(), watchPosts()]);
}
