import { all } from 'redux-saga/effects';
import { watchApplication } from '../Application/sagas';

// Root watcher saga
export default function* IndexSaga() {
	yield all([
		watchApplication(),
	]);
}
