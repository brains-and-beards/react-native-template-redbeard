import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';
import demoScreen from './demoScreen/reducer';

const rootReducer = combineReducers({demoScreen});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
