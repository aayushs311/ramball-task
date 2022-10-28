import { combineReducers } from 'redux'
import volcanoReducer from './volcano/volcanoReducer'

const rootReducer = combineReducers({
  volcano: volcanoReducer
})

export default rootReducer
