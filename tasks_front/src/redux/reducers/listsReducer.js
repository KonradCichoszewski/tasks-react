const initialState = {
    lists: [],
    currentList: null,
}

const loginReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case "SET_LIST": return {
            ...state,
            currentList: action.payload
        }
        default: return state;
    }
}

export default loginReducer;