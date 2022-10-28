import {
  FETCH_VOLCANOS_REQUEST,
  FETCH_VOLCANOS_SUCCESS,
  FETCH_VOLCANOS_FAILURE
} from './volcanoTypes'

const initialState = {
  loading: false,
  volcanos: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOLCANOS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_VOLCANOS_SUCCESS:
      return {
        loading: false,
        volcanos: action.payload,
        error: ''
      }
    case FETCH_VOLCANOS_FAILURE:
      return {
        loading: false,
        volcanos: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
