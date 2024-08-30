import { watchSongsAsync } from "./song";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([watchSongsAsync()]);
}
