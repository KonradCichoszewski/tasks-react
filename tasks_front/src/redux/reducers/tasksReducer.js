import * as actions from "../actions/tasksActions";
import { LOGOUT } from "../actions/authActions";

const initialState = {
  tasks: [],
  loading: false,
  hasErrors: false,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_TASKS:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        hasErrors: false,
      };
    case actions.GET_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default tasksReducer;
