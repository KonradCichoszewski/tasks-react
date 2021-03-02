import axios from "axios";

export const GET_TASKS = "GET_TASKS";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const GET_TASKS_FAILURE = "GET_TASKS_FAILURE";

export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_FAILURE = "ADD_TASK_FAILURE";

export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

export const getTasks = () => ({
  type: GET_TASKS,
});

export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks,
});

export const getTasksFailure = () => ({
  type: GET_TASKS_FAILURE,
});

export function tryGettingTasks(token, list_id) {
  return async (dispatch) => {
    dispatch(getTasks());
    await axios
      .get("http://localhost:3000/tasks/" + list_id, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        dispatch(getTasksSuccess(res.data));
      })
      .catch((err) => dispatch(getTasksFailure()));
  };
}
export const addTask = () => ({
  type: ADD_TASK,
});

export const addTaskSuccess = () => ({
  type: ADD_TASK_SUCCESS,
});

export const addTaskFailure = () => ({
  type: ADD_TASK_FAILURE,
});

export function tryAddingTask(token, task, list_id) {
  return async (dispatch) => {
    dispatch(addTask());
    await axios
      .post(
        "http://localhost:3000/tasks/" + list_id,
        {
          task: task,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(addTaskSuccess(res.data));
      })
      .then(() => {
        axios
          .get("http://localhost:3000/tasks/" + list_id, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            dispatch(getTasksSuccess(res.data));
          })
          .catch((err) => dispatch(getTasksFailure()));
      })
      .catch((err) => dispatch(addTaskFailure()));
  };
}

export const deleteTask = () => ({
  type: DELETE_TASK,
});

export const deleteTaskSuccess = () => ({
  type: DELETE_TASK_SUCCESS,
});

export const deleteTaskFailure = () => ({
  type: DELETE_TASK_FAILURE,
});

export function tryDeletingTask(token, task_id) {
  return async (dispatch) => {
    dispatch(deleteTask());
    await axios
      .delete("http://localhost:3000/tasks/" + task_id, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        dispatch(deleteTaskSuccess());
      })
      .catch((err) => dispatch(deleteTaskFailure()));
  };
}
