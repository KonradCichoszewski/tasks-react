import axios from "axios";
import { changeCurrentList, getListsSuccess } from "./listsActions";
import { getTasksSuccess } from "./tasksActions";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export function tryLogin(email, password) {
  return async (dispatch) => {
    dispatch(login());
    axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((res) => {
        let token = res.data.token;
        axios
          .get("http://localhost:3000/lists", {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            dispatch(changeCurrentList(res.data[res.data.length - 1], token));
            dispatch(getListsSuccess(res.data));
          });
        dispatch(loginSuccess(res.data.token));
      })
      .catch((err) => dispatch(loginFailure()));
  };
}

export const logout = () => ({
  type: LOGOUT,
});
