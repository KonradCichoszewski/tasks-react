import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listsReducer from './listsReducer';
import tasksReducer from './tasksReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer,
    tasks: tasksReducer
});

export default rootReducer;