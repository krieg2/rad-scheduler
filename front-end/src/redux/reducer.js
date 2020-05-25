import { actionTypes } from './actions';

const initialState = {
  events: [],
  isFetching: false,
  error: null
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQ_EVENTS: {
      return { ...state, isFetching: true, error: null };
    }
    case actionTypes.RCV_EVENTS: {
      const { events } = action.payload;
      return { ...state, events, isFetching: false, error: null };
    }
    case actionTypes.ERR_EVENTS: {
      const { error } = action.payload;
      return { ...state, isFetching: false, error };
    }
  }
  return state;
}
  