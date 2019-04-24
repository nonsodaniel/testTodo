import authReducer from './authReducer';
import { combineReducers } from 'redux';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
})

export default rootReducer;