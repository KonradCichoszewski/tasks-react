import axios from 'axios';
import * as actions from '../actions/authActions';

const initialState = {
    loggedIn: false,
    token: null,
    loading: false,
    hasErrors: false
}

const loginReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actions.LOGIN:
            return { ...state, loading: true}
        case actions.LOGIN_SUCCESS: 
            return {
                ...state,
                loggedIn: true,
                token: action.payload,
                loading: false,
                hasErrors: false
            }
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true
            }
        default: return state;
    }
}

export default loginReducer;