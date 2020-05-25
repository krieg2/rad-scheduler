import { put, all, takeLatest } from 'redux-saga/effects';
import { getAllEvents } from '../utils/api';
import { actionTypes, receiveEvents, errorEvents } from './actions'

export function* fetchEvents(action) {
  try{
    const result = yield getAllEvents();
    yield put(receiveEvents(result.data.results));
  } catch (error) {
    yield put(errorEvents(error));
  }
};
  
export default function* () {
  yield all([
    takeLatest(actionTypes.REQ_EVENTS, fetchEvents)
  ])
};