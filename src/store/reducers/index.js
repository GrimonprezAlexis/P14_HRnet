import {combineReducers} from 'redux';
import employeesReducer from './employees';
import toggleModal from './toggleModal';

export default combineReducers({
  data: employeesReducer,
  isModalOpen: toggleModal
})
