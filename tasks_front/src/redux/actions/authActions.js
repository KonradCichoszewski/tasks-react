import axios from 'axios';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = () => ({
    type: LOGIN,
})

export const loginSuccess = (token) => ({
    type: LOGIN_SUCSESS,
    payload: token
})

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
})

export function tryLogin(email, password) {
    return async (dispatch) => {
        dispatch(login());
        await axios.post('hhtp://localhost:3000/login', {
            email, password
        }).then(res => {
            dispatch(loginSuccess(res.data.token));
        }).catch(dispatch(loginFailure));
    }
}

