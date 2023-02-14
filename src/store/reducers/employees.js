import { GET_EMPLOYEES, POST_EMPLOYEE } from '../actions/constant';

const employeesReducer = (state = { employees: [] }, {type, payload}) => {
    switch (type) {
      case GET_EMPLOYEES:
        return {
          employees: payload
        }
      case POST_EMPLOYEE:
        return {
          ...state,
          employees: [...state.employees, payload]
        }
      default:
        return state
    }
}

export default employeesReducer;
