import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {addToCounter, substractFromCounter} from './actions';

const INIT_STATE = {
  counter: 420,
};

export default combineReducers({
  counter: createReducer(INIT_STATE.counter)
    .handleAction(addToCounter, (state, {payload}) => state + payload)
    .handleAction(substractFromCounter, (state, {payload}) => state - payload),
});
