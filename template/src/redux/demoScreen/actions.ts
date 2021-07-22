import {createAction} from 'typesafe-actions';

export const addToCounter = createAction(
  'counter/ADD',
  (value: number) => value,
)();

export const substractFromCounter = createAction(
  'counter/SUBSTRACT',
  (value: number) => value,
)();
