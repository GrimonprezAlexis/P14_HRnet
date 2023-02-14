import { combineReducers } from 'redux';
import employeesReducer from './employees';

export default combineReducers({
  data: employeesReducer
})
