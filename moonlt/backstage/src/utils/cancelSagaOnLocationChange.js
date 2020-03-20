import { fork, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

export default function cancelSagaOnLocationChange(sagas) {
  return sagas.map((saga) =>
    function* newWork() {
      console.log(saga);
      const works = yield fork(saga);
      yield take(LOCATION_CHANGE);
      yield cancel(works);
    }
  );
}
