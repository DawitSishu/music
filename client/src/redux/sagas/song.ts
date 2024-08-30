import {
  getSongsAPI,
  getSongByIdAPI,
  createSongAPI,
  updateSongAPI,
  deleteSongByIdAPI,
} from "../../services/ApiHandler";
import { setSongSlice } from "../songSlice";
import {
  addSongSlice,
  deleteSongSlice,
  editSongSlice,
  getSongsSlice,
} from "../songsSlice";
import {
  CREATE_SONG,
  DELETE_SONG_BY_ID,
  GET_SONGS,
  GET_SONG_BY_ID,
  UPDATE_SONG_BY_ID,
} from "../../Types/SongTypes";
import { put, takeEvery } from "redux-saga/effects";

export function* getUsersSaga(): Generator<any, void, unknown> {
  const songs: any = yield getSongsAPI();
  yield put(getSongsSlice(songs.data));
}

export function* getUserByIdSaga(action: any): Generator<any, void, unknown> {
  yield getSongByIdAPI(action.id);
  yield put(setSongSlice(action.id));
}

export function* createUserSaga(action: any): Generator<any, void, unknown> {
  yield createSongAPI(action.song);
  yield put(addSongSlice(action.song));
}

export function* updateUserSaga(action: any): Generator<any, void, unknown> {
  yield updateSongAPI(action.id, action.song);
  yield put(editSongSlice(action.song));
}

export function* deleteUserByIdSaga(
  action: any
): Generator<any, void, unknown> {
  yield deleteSongByIdAPI(action.id);
  yield put(deleteSongSlice(action.id));
}

export function* watchSongsAsync(): Generator<any, void, unknown> {
  yield takeEvery(GET_SONGS, getUsersSaga);
  yield takeEvery(GET_SONG_BY_ID, getUserByIdSaga);
  yield takeEvery(CREATE_SONG, createUserSaga);
  yield takeEvery(UPDATE_SONG_BY_ID, updateUserSaga);
  yield takeEvery(DELETE_SONG_BY_ID, deleteUserByIdSaga);
}
