import * as actions from '../actions/listsActions'

const initialState = {
    lists: [],
    currentList: null,
    loading: false,
    hasErrors: false
}

const listsReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case actions.GET_LISTS: return {
            ...state,
            loading: true
        }
        case actions.GET_LISTS_SUCCESS: return {
            ...state,
            lists: action.payload,
            loading: false,
            hasErrors: false
        }
        case actions.GET_LISTS_FAILURE: return {
            ...state,
            loading: false,
            hasErrors: true
        }

        case actions.ADD_LIST: return {
            ...state,
            loading: true
        }
        case actions.ADD_LIST_SUCCESS: return {
            ...state,
            loading: false,
            hasErrors: false
        }
        case actions.ADD_LIST_FAILURE: return {
            ...state,
            loading: false,
            hasErrors: true
        }

        case actions.RENAME_LIST: return {
            ...state,
            loading: true
        }
        case actions.RENAME_LIST_SUCCESS: return {
            ...state,
            loading: false,
            hasErrors: false
        }
        case actions.RENAME_LIST_FAILURE: return {
            ...state,
            loading: false,
            hasErrors: true
        }

        case actions.DELETE_LIST: return {
            ...state,
            loading: true
        }
        case actions.DELETE_LIST_SUCCESS: return {
            ...state,
            loading: false,
            hasErrors: false
        }
        case actions.DELETE_LIST_FAILURE: return {
            ...state,
            loading: false,
            hasErrors: true
        }

        case actions.SET_CURRENT_LIST: return {
            ...state,
            currentList: action.payload
        }

        default: return state;
    }
}

export default listsReducer;