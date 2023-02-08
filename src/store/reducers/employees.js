import { FILTER_EMPLOYEE, POST_EMPLOYEE } from '../actions/constant'

const employeesReducer = (state = { employees: [] }, {type, payload}) => {
    switch (type) {
      case POST_EMPLOYEE:
        return {
          ...state,
          employees: [...state.employees, payload]
        }
      case FILTER_EMPLOYEE:
        return {
          ...state,
          employees: payload
        };
      default:
        return state
    }
}

export default employeesReducer;
