import axios from 'axios'
import {
  FETCH_VOLCANOS_REQUEST,
  FETCH_VOLCANOS_SUCCESS,
  FETCH_VOLCANOS_FAILURE
} from './volcanoTypes'

export const fetchVolcanosData = () => {
  return (dispatch) => {
    dispatch(fetchVolcanosRequest())
    axios
      .get('https://gist.githubusercontent.com/arfbramboll/259078f1a1ac6b79619cc49a3c120dea/raw/8a3b6c2a081b3e89b446d9d52678e6112f6f43dc/volcanoes.json')
      .then(response => {
        // response.data is the users
        const users = response.data.features
        dispatch(fetchVolcanosSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchVolcanosFailure(error.message))
      })
  }
}

export const fetchVolcanosRequest = () => {
  return {
    type: FETCH_VOLCANOS_REQUEST
  }
}

export const fetchVolcanosSuccess = users => {
  return {
    type: FETCH_VOLCANOS_SUCCESS,
    payload: users
  }
}

export const fetchVolcanosFailure = error => {
  return {
    type: FETCH_VOLCANOS_FAILURE,
    payload: error
  }
}
