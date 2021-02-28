import axios from 'axios';

export const GET_LISTS = 'GET_LISTS';
export const GET_LISTS_SUCCESS = 'GET_LISTS_SUCCESS';
export const GET_LISTS_FAILURE = 'GET_LISTS_FAILURE';

export const ADD_LIST = 'ADD_LIST';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE';

export const RENAME_LIST = 'RENAME_LIST';
export const RENAME_LIST_SUCCESS = 'RENAME_LIST_SUCCESS';
export const RENAME_LIST_FAILURE = 'RENAME_LIST_FAILURE';

export const DELETE_LIST = 'DELETE_LIST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';

export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';

export const getLists = () => ({
    type: GET_LISTS,
})

export const getListsSuccess = (lists) => ({
    type: GET_LISTS_SUCCESS,
    payload: lists
})

export const getListsFailure = () => ({
    type: GET_LISTS_FAILURE,
})

export function tryGettingLists(token) {
    return async (dispatch) => {
        dispatch(getLists());
        await axios.get('http://localhost:3000/lists', {
            headers: {
                authorization: token
            }
        }).then(res => {
            dispatch(getListsSuccess(res.data));
            dispatch(setCurrentList(res.data[res.data.length-1].id))
        }).catch(err => dispatch(getListsFailure()));
    }
}

export const addList = () => ({
    type: ADD_LIST,
})

export const addListSuccess = () => ({
    type: ADD_LIST_SUCCESS,
})

export const addListFailure = () => ({
    type: ADD_LIST_FAILURE,
})

export function tryAddingList(token, list_title) {
    return async (dispatch) => {
        dispatch(addList());
        await axios.post('http://localhost:3000/lists', {
            title: list_title
        },{
            headers: {
                authorization: token
            }
        }).then(res => {
            dispatch(addListSuccess());
        }).catch(err => dispatch(addListFailure()));
    }
}

export const renameList = () => ({
    type: RENAME_LIST,
})

export const renameListSuccess = () => ({
    type: RENAME_LIST_SUCCESS,
})

export const renameListFailure = () => ({
    type: RENAME_LIST_FAILURE,
})

export function tryRenamingList(token, list_title, list_id) {
    return async (dispatch) => {
        dispatch(renameList());
        await axios.patch('http://localhost:3000/lists/' + list_id, {
            title: list_title
        },{
            headers: {
                authorization: token
            }
        }).then(res => {
            dispatch(renameListSuccess());
        }).catch(err => dispatch(renameListFailure()));
    }
}

export const deleteList = () => ({
    type: DELETE_LIST,
})

export const deleteListSuccess = () => ({
    type: DELETE_LIST_SUCCESS,
})

export const deleteListFailure = () => ({
    type: DELETE_LIST_FAILURE,
})

export function tryDeletingList(token, list_id) {
    return async (dispatch) => {
        dispatch(deleteList());
        await axios.delete('http://localhost:3000/lists/' + list_id, {
            headers: {
                authorization: token
            }
        }).then(res => {
            dispatch(deleteListSuccess());
        }).catch(err => dispatch(deleteListFailure()));
    }
}

export const setCurrentList = (list) => ({
    type: SET_CURRENT_LIST,
    payload: list
})

export function changeCurrentList(list) {
    return (dispatch) => dispatch(setCurrentList(list));
}

